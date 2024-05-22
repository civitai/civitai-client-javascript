// import {
//   BaseHttpRequest,
//   CancelError,
//   CancelablePromise,
//   JobTemplateReference,
//   RequestInfo,
//   RequestsService,
//   ResultInclusion,
// } from '../generated';

// export class RequestsClient extends RequestsService {
//   constructor(public readonly httpRequest: BaseHttpRequest) {
//     super(httpRequest);
//   }
//   public override submitRequest(
//     props?: {
//       include?: ResultInclusion | undefined;
//       requestBody?: JobTemplateReference | JobTemplateReference[] | undefined;
//       wait?: boolean | undefined;
//       whatif?: boolean | undefined;
//     },
//     options?: { cleanupOnCancellation?: boolean }
//   ): CancelablePromise<RequestInfo> {
//     return new CancelablePromise<RequestInfo>(async (resolve, reject, oncancel) => {
//       try {
//         const { wait, include } = props ?? {};
//         const { cleanupOnCancellation = true } = options ?? {};
//         let result = await withCancellation(super.submitRequest({ ...props, wait: false }));

//         if (!result) throw new Error('no result');

//         try {
//           while (wait && (result.status === 'Initialized' || result.status === 'Processing')) {
//             result = await withCancellation(
//               this.getRequest({ requestId: result.id, include, wait })
//             );
//           }
//           resolve(result);
//         } catch (error) {
//           if (error instanceof CancelError && wait && cleanupOnCancellation) {
//             console.log('cancelling request');
//             await this.updateRequest({
//               requestId: result.id,
//               requestBody: {
//                 status: 'Canceled',
//               },
//             });
//           }

//           throw error;
//         }
//       } catch (error) {
//         reject(error);
//       }

//       function withCancellation<T>(promise: CancelablePromise<T>) {
//         oncancel(promise.cancel);
//         return promise;
//       }
//     });
//   }
// }
