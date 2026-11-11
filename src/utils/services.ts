import {
  services,
  type ServiceCategory,
  type ServiceEntry,
  type ServiceHosting,
  type ServiceName,
} from '../generated/services.gen.js';

export type ServiceInfo = {
  name: ServiceName;
  category: ServiceCategory;
  hosting: ServiceHosting;
  /** WorkflowStep `$type` this input is used with. */
  stepType?: string;
  /** Discriminator values on the input that select this schema (e.g. engine/model/operation). */
  discriminators: Readonly<Record<string, string>>;
};

type StepLike = { $type?: string; input?: unknown };

/**
 * Resolves the service (category + hosting) a workflow step will run on, based on its
 * `$type` and the discriminator values in its input (engine, model, operation, ...).
 * Returns the most specific match, or undefined when the step isn't in the catalog.
 *
 * @example
 * getServiceInfo({ $type: 'imageGen', input: { engine: 'flux2', model: 'pro', operation: 'createImage' } })
 * // => { name: 'Flux2ProCreateImageInput', category: 'image', hosting: 'partner', ... }
 */
export function getServiceInfo(step: StepLike): ServiceInfo | undefined {
  if (!step.$type) return undefined;
  const input = (step.input ?? {}) as Record<string, unknown>;
  let best: ServiceInfo | undefined;
  for (const [name, entry] of Object.entries(services) as [ServiceName, ServiceEntry][]) {
    const [category, hosting, stepType, discriminators = {}] = entry;
    if (stepType !== step.$type) continue;
    const pairs = Object.entries(discriminators);
    if (!pairs.every(([key, value]) => input[key] === value)) continue;
    if (!best || pairs.length > Object.keys(best.discriminators).length) {
      best = { name, category, hosting, stepType, discriminators };
    }
  }
  return best;
}

export function getServiceHosting(step: StepLike): ServiceHosting | undefined {
  return getServiceInfo(step)?.hosting;
}

export function isPartnerService(step: StepLike): boolean {
  return getServiceHosting(step) === 'partner';
}
