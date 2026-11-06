# @civitai/orchestration-client

Civitai's JavaScript client for generating AI content.

```bash
npm install @civitai/orchestration-client
```

```ts
import { createCivitaiClient } from '@civitai/orchestration-client';

const client = createCivitaiClient({ auth: process.env.CIVITAI_API_TOKEN });
```

## Model merge analysis

Moderator and internal Manager tokens can submit `modelAnalysis` workflows. The step prepares missing fingerprints on CPU workers and returns a report in `steps[0].output.report` plus a downloadable report blob.

```ts
import {
  createCivitaiClient,
  submitWorkflow,
  type ModelAnalysisStepTemplate,
} from '@civitai/orchestration-client';

const client = createCivitaiClient({ auth: process.env.CIVITAI_API_TOKEN! });
const step: ModelAnalysisStepTemplate = {
  $type: 'modelAnalysis',
  name: 'analysis',
  input: {
    baseModel: 'urn:air:krea2:checkpoint:civitai:2726029@3064584+2943406',
    checkpoint: 'urn:air:krea2:checkpoint:civitai:2729631@3107962+2992026',
    loras: [{ model: 'urn:air:krea2:lora:civitai:2688234@3070702+2949534' }],
  },
};
const { data: workflow } = await submitWorkflow({ client, body: { steps: [step] }, throwOnError: true });
```

Use `getWorkflow` with the returned ID or a detailed completion callback to receive the result. `invokeModelAnalysisStepTemplate` provides the synchronous convenience endpoint. See the [model analysis recipe](https://developer.civitai.com/orchestration/recipes/model-analysis) for access requirements, cache behavior and verdicts.

## Renamed from `@civitai/client`

This package was previously published as `@civitai/client`. Publishing to that name has been
blocked by a registry-side failure since 2026-09-02 — every publish returns a 503 while every
other operation on the package succeeds — so development continues here.

Releases continue under `@civitai/orchestration-client`; the old `@civitai/client` name is frozen
and will not be updated. Which migration you need depends on the version you have installed —
check with `npm ls @civitai/client`:

| Installed `@civitai/client` | How you got it | API | Migration |
| --- | --- | --- | --- |
| `0.2.0-beta.*` | `@civitai/client@beta` or a pinned beta | `createCivitaiClient` factory | Package name only |
| `0.1.x` | `npm install @civitai/client` (the `latest` tag) | `CivitaiClient` class | Package name **and** API |

**From the `0.2.0` betas** the API is unchanged; swap the dependency and update your imports:

```diff
-import { createCivitaiClient } from '@civitai/client';
+import { createCivitaiClient } from '@civitai/orchestration-client';
```

**From `0.1.x`** (what an unversioned `npm install @civitai/client` still resolves to), changing
only the package name is not enough: the `CivitaiClient` class does not exist in this package.
Replace it with the `createCivitaiClient` factory shown at the top of this README.

## Releasing

Releases are automated. Run `pnpm release`, which typechecks, builds and bumps the patch version
in `package.json`, then commit and push to `main`; the
[release workflow](.github/workflows/release.yml) tests, builds, and publishes to npm using
trusted publishing, then tags the commit.

Plain versions (`0.2.1`) publish under `latest`. A prerelease version (`0.3.0-beta.1`), set by
hand, publishes under the `beta` dist-tag instead, for testing a change before it reaches everyone.

## Regenerating the client

The contents of `src/generated/` are generated from the orchestration OpenAPI spec and should not
be edited by hand:

```bash
npm run generate
```
