import { BaseHttpRequest } from '../generated/core/BaseHttpRequest';
import { Interceptors, OpenAPIConfig } from '../generated/core/OpenAPI';
import { GeneratedClient } from '../generated/GeneratedClient';

type ClientConfig = {
  env?: 'dev' | 'prod';
  base?: string; // TODO - implement a base path override
  auth: string;
  interceptors?: {
    request?: Interceptors<RequestInit>;
    response?: Interceptors<Response>;
  };
};

// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & NonNullable<unknown>;

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class CivitaiClient extends GeneratedClient {
  constructor(config: ClientConfig, HttpRequest?: HttpRequestConstructor) {
    super(
      {
        BASE:
          config.env === 'dev'
            ? 'https://orchestration-dev.civitai.com'
            : 'https://orchestration-stage.civitai.com', // TODO: Switch to orchestration.civitai.com once prod is back up and running
        HEADERS: { Authorization: `Bearer ${config.auth}` },
        interceptors: {
          request: config?.interceptors?.request ?? new Interceptors(),
          response: config?.interceptors?.response ?? new Interceptors(),
        },
      },
      HttpRequest
    );
  }
}

// const test = new CivitaiClient({ auth: '' });
// test.requests.submitRequest([{ $type: 'textToImage' }]);

// test.workflows.submitRequest({requestBody: {} as TextToImageStep})
