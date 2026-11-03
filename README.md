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
other operation on the package succeeds — so development continues here. The API is unchanged;
only the package name differs.

To migrate, swap the dependency and update your imports:

```diff
-import { createCivitaiClient } from '@civitai/client';
+import { createCivitaiClient } from '@civitai/orchestration-client';
```

`@civitai/client` remains installable at `0.2.0-beta.98` but will not receive further releases.

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
