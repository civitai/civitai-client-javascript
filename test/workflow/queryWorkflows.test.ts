import { createCivitaiClient } from '../../src/client/CivitaiClient';
import dotenv from 'dotenv';
import { queryWorkflows } from '../../src/generated';
dotenv.config();

describe('Query workflows', () => {
  let client: ReturnType<typeof createCivitaiClient>;

  beforeAll(() => {
    client = createCivitaiClient({
      auth: process.env.CIVITAI_API_TOKEN || '',
      env: 'dev',
    });
  });

  test('successfully queries workflows', async () => {
    // const workflows = await queryWorkflows({ client, query: { take: 10 } });
    // expect(workflows).toBeDefined();
  });
});
