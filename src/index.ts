export * from './generated';
export * from './utils';
export * from './client/CivitaiClient';

import type { TripoFalPolyGenInput as GeneratedTripoFalPolyGenInput } from './generated';

// Existing Tripo callers can still omit version to use v2.5.
export type TripoFalPolyGenInput = Omit<GeneratedTripoFalPolyGenInput, 'version'> & {
  version?: 'v2.5';
};
