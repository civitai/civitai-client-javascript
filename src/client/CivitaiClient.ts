import { createClient, createConfig } from '../generated/client';
import { ProblemDetails } from '../generated';

type ClientConfig = {
  env?: 'dev' | 'prod';
  baseUrl?: string;
  base?: string; // TODO - implement a base path override
  auth: string;
};

export function createCivitaiClient(config: ClientConfig) {
  const client = createClient(
    createConfig({
      baseUrl: config.baseUrl
        ? config.baseUrl
        : config.env === 'dev'
          ? 'https://orchestration-dev.civitai.com'
          : 'https://orchestration.civitai.com',
      headers: {
        Authorization: `Bearer ${config.auth}`,
      },
    })
  );

  client.interceptors.response.use(async (response) => {
    if (!response.ok) {
      const error = (
        response.status === 400
          ? await response
              .json()
              .catch(() => ({ status: response.status, detail: response.statusText }))
          : { status: response.status, detail: response.statusText }
      ) as ProblemDetails;
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
