import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://orchestration-dev.civitai.com/openapi/v2.json',
  // input: 'swagger.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: 'src/generated',
  },
  types: {
    enums: 'javascript',
  },
  client: '@hey-api/client-fetch',
});
