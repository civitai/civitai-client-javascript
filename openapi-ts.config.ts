import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://orchestration-dev.civitai.com/swagger/consumer-v2/swagger.json',
  // input: 'swagger.json',
  output: 'src/generated',
  format: 'prettier',
  lint: 'eslint',
  enums: 'javascript',
  name: 'GeneratedClient',
});
