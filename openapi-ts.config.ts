import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://orchestration-dev.civitai.com/openapi/v2.json',
  // input: 'swagger.json',
  output: 'src/generated',
  format: 'prettier',
  lint: 'eslint',
  enums: 'javascript',
  name: 'GeneratedClient',
  client: 'fetch',
});
