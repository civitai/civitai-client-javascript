import { Interceptors } from '../generated/core/OpenAPI';
import { BaseHttpRequest, GeneratedClient, OpenAPIConfig } from '../generated/index';

type ClientConfig = {
  env?: 'dev' | 'prod';
  auth: string;
  interceptors?: { request?: Interceptors<RequestInit>; response?: Interceptors<Response> };
};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
type Service<T> = Omit<T, 'httpRequest'>;
type Client<T> = {
  [K in keyof T]: Prettify<Service<T[K]>>;
};

interface ICivitaiClient extends Client<Omit<GeneratedClient, 'request'>> {}

// const waitRequestInterceptor = new Interceptors<RequestInit>();
// waitRequestInterceptor.use((request) => {
//   return request;
// })

const requestInterceptor = new Interceptors<RequestInit>();
requestInterceptor.use((request) => {
  console.log('-----------REQUEST INTERCEPTOR-------------');
  console.dir(request, { depth: null });
  console.log('---------END REQUEST INTERCEPTOR-------------');

  return request;
});

const responseInterceptor = new Interceptors<Response>();
responseInterceptor.use((response) => {
  console.log('-----------RESPONSE INTERCEPTOR-------------');
  console.dir(response, { depth: null });
  console.log('---------END RESPONSE INTERCEPTOR-------------');
  return response;
});

export function createCivitaiClient(config: ClientConfig, HttpRequest?: HttpRequestConstructor) {
  return new GeneratedClient(
    {
      BASE:
        config.env === 'dev'
          ? 'https://orchestration-stage.civitai.com'
          : 'https://orchestration.civitai.com',
      HEADERS: { Authorization: `Bearer ${config.auth}` },
      interceptors: {
        // request: requestInterceptor,
        // response: responseInterceptor,
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    },
    HttpRequest
  ) as ICivitaiClient;
}
