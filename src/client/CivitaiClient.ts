import { RequestsClient } from './RequestsClient';
import { BaseHttpRequest } from '../generated/core/BaseHttpRequest';
import { Interceptors, OpenAPIConfig } from '../generated/core/OpenAPI';
import { JobsService, ModelService } from '../generated/services.gen';
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
type Service<T> = Omit<T, 'httpRequest'>;
// type Client<T> = {
//   [K in keyof T]: Prettify<Service<T[K]>>;
// };

// interface ICivitaiClient extends Client<Omit<GeneratedClient, 'request'>> {}

export class CivitaiClient {
  public readonly jobs: Service<JobsService>;
  public readonly model: Service<ModelService>;
  public readonly requests: RequestsClient;

  constructor(config: ClientConfig, HttpRequest?: HttpRequestConstructor) {
    const client = new GeneratedClient(
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

    this.jobs = client.jobs;
    this.model = client.model;
    this.requests = new RequestsClient(client.request);
  }
}

// const test = new CivitaiClient({ auth: '' });
// test.requests.submitRequest([{ $type: 'textToImage' }]);
