import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://orchestration.civitai.com/openapi/v2-consumers.json',
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
