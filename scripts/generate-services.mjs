/**
 * Generates src/generated/services.gen.ts: a catalog of every schema in
 * swagger.json that carries an `x-service` extension ({ category, hosting }).
 *
 * For each entry we also resolve:
 *  - stepType: the WorkflowStep `$type` whose `input` is (an ancestor of) the schema
 *  - discriminators: the discriminator values (engine, model, operation, ...)
 *    that select this schema, inherited through the allOf chain
 *
 * That lets consumers answer "is this step/input partner-hosted?" at runtime
 * without knowing generated schema names.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

// Optional args (for testing): [specPath] [outPath]
const specPath = process.argv[2] ?? join(repoRoot, 'swagger.json');
const outPath = process.argv[3] ?? join(repoRoot, 'src', 'generated', 'services.gen.ts');

// Hosting values always exported as lists, even if the spec has none of them,
// so consumers' imports keep working when x-service is missing from the spec.
const KNOWN_HOSTINGS = ['internal', 'partner', 'perRequest'];

const spec = JSON.parse(readFileSync(specPath, 'utf-8'));
const schemas = spec.components?.schemas ?? {};
const refName = (ref) => ref.split('/').pop();

// schema name -> parent schema name (first allOf $ref)
const parentMap = new Map();
for (const [name, schema] of Object.entries(schemas)) {
  const parentRef = schema.allOf?.find((e) => e.$ref)?.$ref;
  if (parentRef) parentMap.set(name, refName(parentRef));
}

const chainOf = (name) => {
  const chain = [];
  for (let n = name; n; n = parentMap.get(n)) chain.push(n);
  return chain;
};

// discriminator owner -> { propertyName, schemaToValue }
const discriminators = new Map();
for (const [name, schema] of Object.entries(schemas)) {
  const disc =
    schema.discriminator ?? schema.allOf?.find((e) => !e.$ref && e.discriminator)?.discriminator;
  if (!disc?.mapping) continue;
  const schemaToValue = new Map();
  for (const [value, ref] of Object.entries(disc.mapping)) schemaToValue.set(refName(ref), value);
  discriminators.set(name, { propertyName: disc.propertyName, schemaToValue });
}

// Resolve discriminator values for a schema: for every discriminator owned by an
// ancestor, take the value of the nearest chain member listed in its mapping.
function resolveDiscriminators(name) {
  const chain = chainOf(name);
  const result = {};
  // walk from root to leaf so the output order reads engine -> model -> operation
  for (let i = chain.length - 1; i >= 0; i--) {
    const disc = discriminators.get(chain[i]);
    if (!disc || disc.propertyName === '$type') continue;
    const member = chain.slice(0, i).find((n) => disc.schemaToValue.has(n));
    if (member) result[disc.propertyName] = disc.schemaToValue.get(member);
  }
  return result;
}

// root input schema name -> step $type (via WorkflowStep mapping -> Step.input)
const inputToStepType = new Map();
const inlineStepServices = []; // steps whose input is an inline schema with x-service
for (const [stepType, ref] of Object.entries(schemas.WorkflowStep?.discriminator?.mapping ?? {})) {
  const step = schemas[refName(ref)];
  const parts = [step, ...(step?.allOf ?? [])];
  const input = parts.find((p) => p?.properties?.input)?.properties.input;
  if (!input) continue;
  if (input.$ref) inputToStepType.set(refName(input.$ref), stepType);
  else if (input['x-service']) inlineStepServices.push({ stepType, xService: input['x-service'] });
}

const stepTypeOf = (name) => {
  for (const n of chainOf(name)) if (inputToStepType.has(n)) return inputToStepType.get(n);
  return undefined;
};

// Collect services from schemas that declare x-service. Entries without a hosting
// value are skipped (and reported) so they never leak in as an 'undefined' hosting.
const services = {};
const missingHosting = [];
for (const name of Object.keys(schemas).sort()) {
  const xService = schemas[name]['x-service'];
  if (!xService) continue;
  if (!xService.hosting) {
    missingHosting.push(name);
    continue;
  }
  const entry = { category: xService.category, hosting: xService.hosting };
  const stepType = stepTypeOf(name);
  if (stepType) entry.stepType = stepType;
  entry.discriminators = resolveDiscriminators(name);
  services[name] = entry;
}
for (const { stepType, xService } of inlineStepServices) {
  const name = `${stepType[0].toUpperCase()}${stepType.slice(1)}Input`;
  if (services[name]) continue;
  if (!xService.hosting) {
    missingHosting.push(name);
    continue;
  }
  services[name] = {
    category: xService.category,
    hosting: xService.hosting,
    stepType,
    discriminators: {},
  };
}

const values = (key) => [...new Set(Object.values(services).map((s) => s[key]))].sort();
const union = (arr) => arr.map((v) => `'${v}'`).join(' | ');
const namesWhere = (hosting) =>
  Object.keys(services)
    .filter((n) => services[n].hosting === hosting)
    .sort();
const hostings = [...new Set([...KNOWN_HOSTINGS, ...values('hosting')])];
const categories = values('category');

const q = (v) => `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const key = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k));

// One compact tuple per line: [category, hosting, stepType?, discriminators?]
const entryLine = (name, { category, hosting, stepType, discriminators }) => {
  const parts = [q(category), q(hosting)];
  const discs = Object.entries(discriminators);
  if (stepType || discs.length) parts.push(stepType ? q(stepType) : 'undefined');
  if (discs.length) parts.push(`{ ${discs.map(([k, v]) => `${key(k)}: ${q(v)}`).join(', ')} }`);
  return `  ${key(name)}: [${parts.join(', ')}],`;
};

const lines = [
  '// This file is auto-generated by scripts/generate-services.mjs from swagger.json. Do not edit.',
  '',
  `export type ServiceHosting = ${union(hostings)};`,
  '',
  `export type ServiceCategory = ${categories.length ? union(categories) : 'string'};`,
  '',
  '/** [category, hosting, stepType (WorkflowStep `$type`), discriminators (e.g. engine/model/operation)] */',
  'export type ServiceEntry = readonly [',
  '  category: ServiceCategory,',
  '  hosting: ServiceHosting,',
  '  stepType?: string,',
  '  discriminators?: Readonly<Record<string, string>>,',
  '];',
  '',
  'export const services = {',
  ...Object.keys(services).map((n) => entryLine(n, services[n])),
  '} as const satisfies Record<string, ServiceEntry>;',
  '',
  'export type ServiceName = keyof typeof services;',
  '',
  'export type ServiceNameByHosting<H extends ServiceHosting> = {',
  '  [K in ServiceName]: (typeof services)[K][1] extends H ? K : never;',
  '}[ServiceName];',
  '',
  'const namesByHosting = <H extends ServiceHosting>(hosting: H): readonly ServiceNameByHosting<H>[] =>',
  '  (Object.keys(services) as ServiceName[]).filter(',
  '    (name): name is ServiceNameByHosting<H> => services[name][1] === hosting',
  '  );',
  '',
  ...hostings.map((h) => `export const ${h}Services = namesByHosting(${q(h)});`),
  '',
];

writeFileSync(outPath, lines.join('\n'));
const counts = hostings.map((h) => `${h}: ${namesWhere(h).length}`).join(', ');
console.log(`Wrote ${Object.keys(services).length} services to services.gen.ts (${counts})`);
if (missingHosting.length) {
  console.warn(
    `Warning: skipped ${missingHosting.length} x-service entries with no hosting: ${missingHosting.join(', ')}`
  );
}
if (Object.keys(services).length === 0) {
  console.warn(
    'Warning: no x-service hosting data found in the spec; services.gen.ts exports empty lists.'
  );
}
