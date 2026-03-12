/**
 * Fixes incorrect discriminator values in generated TypeScript types.
 *
 * @hey-api/openapi-ts doesn't resolve inherited discriminator values through
 * allOf chains. When a schema extends a parent that's in a discriminator mapping
 * (e.g. NanoBanana2ImageGenInput → GoogleImageGenInput, where GoogleImageGenInput
 * maps to engine: "google"), the codegen falls back to using the schema name
 * as the discriminator value instead of inheriting the parent's value.
 *
 * This script reads swagger.json to build correct discriminator values for each
 * schema by walking the allOf inheritance chain, then fixes the generated types.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

// Read the spec
const spec = JSON.parse(readFileSync(join(repoRoot, 'swagger.json'), 'utf-8'));
const schemas = spec.components?.schemas ?? {};

// Build parent map: schema name → parent schema name (from first allOf $ref)
const parentMap = new Map();
for (const [name, schema] of Object.entries(schemas)) {
  if (!schema.allOf) continue;
  for (const entry of schema.allOf) {
    if (entry.$ref) {
      parentMap.set(name, entry.$ref.split('/').pop());
      break;
    }
  }
}

// Find discriminators (can be at top level or inside allOf entries)
function findDiscriminator(schema) {
  if (schema.discriminator) return schema.discriminator;
  if (schema.allOf) {
    for (const entry of schema.allOf) {
      if (!entry.$ref && entry.discriminator) return entry.discriminator;
    }
  }
  return null;
}

// Build: for each discriminator-owning schema, the property name and mapping
// mapping is inverted: schema name → discriminator value
const discriminators = []; // [{propertyName, schemaToValue: Map}]
for (const [name, schema] of Object.entries(schemas)) {
  const disc = findDiscriminator(schema);
  if (!disc?.mapping) continue;
  const schemaToValue = new Map();
  for (const [value, ref] of Object.entries(disc.mapping)) {
    schemaToValue.set(ref.split('/').pop(), value);
  }
  discriminators.push({ propertyName: disc.propertyName, schemaToValue });
}

// For each schema, resolve all discriminator property values by walking up the
// allOf chain. If a schema isn't directly in a discriminator mapping, inherit
// the value from its nearest ancestor that IS in the mapping.
const corrections = new Map(); // schemaName → {propertyName: correctValue}

for (const [schemaName] of Object.entries(schemas)) {
  for (const { propertyName, schemaToValue } of discriminators) {
    // Check if this schema is directly in this discriminator's mapping
    if (schemaToValue.has(schemaName)) continue;

    // Walk up the parent chain to find an ancestor that IS in the mapping
    let ancestor = parentMap.get(schemaName);
    while (ancestor) {
      if (schemaToValue.has(ancestor)) {
        // Found it! This schema should inherit the ancestor's discriminator value
        const correctValue = schemaToValue.get(ancestor);
        if (!corrections.has(schemaName)) corrections.set(schemaName, {});
        corrections.get(schemaName)[propertyName] = correctValue;
        break;
      }
      ancestor = parentMap.get(ancestor);
    }
  }
}

// Also generate corrections for "Writable" variants that the codegen creates.
// These aren't in the spec but follow the same discriminator pattern with a
// "Writable" suffix (e.g. Flux1KontextDevImageGenInputWritable).
const writableCorrections = new Map();
for (const [schemaName, props] of corrections) {
  const writableName = `${schemaName}Writable`;
  writableCorrections.set(writableName, props);
}

// Read the generated types file and apply corrections
const typesPath = join(repoRoot, 'src', 'generated', 'types.gen.ts');
let types = readFileSync(typesPath, 'utf-8');
let fixCount = 0;

const allCorrections = new Map([...corrections, ...writableCorrections]);

for (const [schemaName, props] of allCorrections) {
  for (const [propName, correctValue] of Object.entries(props)) {
    // The codegen produces: propertyName: 'SchemaName';
    // We want: propertyName: 'correctValue';
    const incorrect = `${propName}: '${schemaName}'`;
    const correct = `${propName}: '${correctValue}'`;
    if (types.includes(incorrect)) {
      types = types.replaceAll(incorrect, correct);
      fixCount++;
    }
  }
}

writeFileSync(typesPath, types);
console.log(`Fixed ${fixCount} incorrect discriminator values in types.gen.ts`);
