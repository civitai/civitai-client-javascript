import { CivitaiClient } from '../../src/client/CivitaiClient';
import dotenv from 'dotenv';
dotenv.config();

describe('Query workflows', () => {
  let client: CivitaiClient;

  beforeAll(() => {
    client = new CivitaiClient({
      auth: process.env.CIVITAI_API_TOKEN || '',
      env: 'dev',
    });
  });

  test('successfully queries workflows', async () => {
    const workflows = await client.workflows.queryWorkflows({ take: 10 });
    expect(workflows).toBeDefined();
  });
});
