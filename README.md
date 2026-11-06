# @civitai/orchestration-client

Civitai's JavaScript client for generating AI content.

```bash
npm install @civitai/orchestration-client
```

```ts
import { createCivitaiClient } from '@civitai/orchestration-client';

const client = createCivitaiClient({ auth: process.env.CIVITAI_API_TOKEN });
```

## Renamed from `@civitai/client`

This package was previously published as `@civitai/client`. Publishing to that name has been
blocked by a registry-side failure since 2026-09-02 — every publish returns a 503 while every
other operation on the package succeeds — so development continues here.

`@civitai/client` will not receive further releases. Which migration you need depends on the
version you have installed — check with `npm ls @civitai/client`:

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
