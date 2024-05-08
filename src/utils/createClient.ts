import { Interceptors } from '../generated/core/OpenAPI';
import {
  BaseHttpRequest,
  CancelError,
  CancelablePromise,
  GeneratedClient,
  JobTemplateReference,
  OpenAPIConfig,
  RequestInfo,
  RequestsService,
  ResultInclusion,
} from '../generated/index';

type ClientConfig = {
  env?: 'dev' | 'prod';
  base?: string; // TODO - implement a base path override
  auth: string;
  interceptors?: {
    request?: Interceptors<RequestInit>;
    response?: Interceptors<Response>;
  };
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

// class CivitaiClient extends GeneratedClient implements ICivitaiClient {
//   constructor(config: ClientConfig, HttpRequest?: HttpRequestConstructor) {
//     super(
//       {
//         BASE:
//           config.env === 'dev'
//             ? 'https://orchestration-dev.civitai.com'
//             : 'https://orchestration-stage.civitai.com', // TODO: Switch to orchestration.civitai.com once prod is back up and running
//         HEADERS: { Authorization: `Bearer ${config.auth}` },
//         interceptors: {
//           request: config?.interceptors?.request ?? new Interceptors(),
//           response: config?.interceptors?.response ?? new Interceptors(),
//         },
//       },
//       HttpRequest
//     );
//   }

//   public override requests = new CustomRequestsService(this.request);
// }
// export class CustomRequestsService extends RequestsService {
//   constructor(public readonly httpRequest: BaseHttpRequest) {
//     super(httpRequest);
//   }

//   public override submitRequest(
//     props: Parameters<GeneratedClient['requests']['submitRequest']>[0],
//     options?: { cleanupOnCancellation?: boolean }
//   ): CancelablePromise<RequestInfo> {
//     return new CancelablePromise<RequestInfo>(async (resolve, reject, oncancel) => {
//       const { wait, include } = props ?? {};
//       const { cleanupOnCancellation = true } = options ?? {};

//       let result = await withCancellation(this.submitRequest({ ...props, wait: false }));

//       if (!result) throw new Error('no result');

//       try {
//         while (wait && (result.status === 'Initialized' || result.status === 'Processing')) {
//           result = await withCancellation(this.getRequest({ requestId: result.id, include, wait }));
//         }
//         resolve(result);
//       } catch (error) {
//         if (error instanceof CancelError && wait && cleanupOnCancellation) {
//           console.log('cancelling request');
//           await this.updateRequest({
//             requestId: result.id,
//             requestBody: {
//               status: 'Canceled',
//             },
//           });
//         }

//         reject(error);
//       }

//       function withCancellation<T>(promise: CancelablePromise<T>) {
//         oncancel(promise.cancel);
//         return promise;
//       }
//     });
//   }
// }

export function createCivitaiClient(config: ClientConfig, HttpRequest?: HttpRequestConstructor) {
  const client = new GeneratedClient(
    {
      BASE:
        config.base ?? config.env === 'dev'
          ? 'https://orchestration-dev.civitai.com'
          : 'https://orchestration-stage.civitai.com', // TODO: Switch to orchestration.civitai.com once prod is back up and running
      HEADERS: { Authorization: `Bearer ${config.auth}` },
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    },
    HttpRequest
  ) as ICivitaiClient;

  function trySubmitRequest(
    props: Parameters<typeof client.requests.submitRequest>[0],
    options?: { cleanupOnCancellation?: boolean }
  ) {
    return new CancelablePromise<RequestInfo>(async (resolve, reject, oncancel) => {
      try {
        const { wait, include } = props ?? {};
        const { cleanupOnCancellation = true } = options ?? {};
        let result = await withCancellation(
          client.requests.submitRequest({ ...props, wait: false })
        );

        if (!result) throw new Error('no result');

        try {
          while (wait && (result.status === 'Initialized' || result.status === 'Processing')) {
            result = await withCancellation(
              client.requests.getRequest({ requestId: result.id, include, wait })
            );
          }
          resolve(result);
        } catch (error) {
          if (error instanceof CancelError && wait && cleanupOnCancellation) {
            console.log('cancelling request');
            await client.requests.updateRequest({
              requestId: result.id,
              requestBody: {
                status: 'Canceled',
              },
            });
          }

          throw error;
        }
      } catch (error) {
        reject(error);
      }

      function withCancellation<T>(promise: CancelablePromise<T>) {
        oncancel(promise.cancel);
        return promise;
      }
    });
  }

  const requests = { ...client.requests, submitRequest: trySubmitRequest };

  return {
    ...client,
    requests,
  };
}
