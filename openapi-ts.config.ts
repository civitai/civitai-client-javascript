import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  // input: 'https://orchestration.civitai.com/openapi/v2-consumers.json',
  input: 'swagger.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: 'src/generated',
  },
  plugins: ['@hey-api/client-fetch', { enums: true, name: '@hey-api/typescript' }, '@hey-api/sdk'],
  // parser: {
  //   transforms: {
  //     enums: 'root',
  //   },
  // },
});
