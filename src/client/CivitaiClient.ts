import { createClient } from '@hey-api/client-fetch';
import { ProblemDetails } from '../generated';

type ClientConfig = {
  env?: 'dev' | 'prod';
  base?: string; // TODO - implement a base path override
  auth: string;
};

export function createCivitaiClient(config: ClientConfig) {
  const client = createClient({
    baseUrl:
      config.env === 'dev'
        ? 'https://orchestration-dev.civitai.com'
        : 'https://orchestration.civitai.com',
    global: false,
    headers: {
      Authorization: `Bearer ${config.auth}`,
    },
  });

  client.interceptors.response.use(async (response) => {
    if (!response.ok) {
      const error = { status: response.status, detail: response.statusText } as ProblemDetails;
      const newResponse = new Response(JSON.stringify(error), {
        status: response.status,
        statusText: response.statusText,
      });
      return newResponse;
    }

    return response;
  });

  return client;
}
