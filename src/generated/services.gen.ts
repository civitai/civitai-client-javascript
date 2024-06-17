// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { $OpenApiTs } from './types.gen';

export class BlobsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get blob by ID.
   * @param data The data for the request.
   * @param data.blobId The blob ID to retrieve.
   * @throws ApiError
   */
  public getBlob(
    data: $OpenApiTs['/v2/consumer/blobs/{blobId}']['get']['req']
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/consumer/blobs/{blobId}',
      path: {
        blobId: data.blobId,
      },
      errors: {
        401: 'Unauthorized',
      },
    });
  }
}

export class ConfigurationsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create a new configuration.
   * @param data The data for the request.
   * @param data.requestBody The details of the configuration being created.
   * @returns CreateConfigurationResult Success
   * @throws ApiError
   */
  public createConfiguration(
    data: $OpenApiTs['/v2/providers/configurations']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/v2/providers/configurations']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/v2/providers/configurations',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
      },
    });
  }

  /**
   * Query for existing configurations.
   * @returns ConfigurationStatus Success
   * @throws ApiError
   */
  public queryConfigurations(): CancelablePromise<
    $OpenApiTs['/v2/providers/configurations']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/configurations',
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
      },
    });
  }

  /**
   * Get options for a configuration.
   * @param data The data for the request.
   * @param data.configurationId The ID of the configuration whose options are being requested.
   * @returns ConfigurationOptions Success
   * @throws ApiError
   */
  public getConfiguration(
    data: $OpenApiTs['/v2/providers/configurations/{configurationId}/options']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/v2/providers/configurations/{configurationId}/options']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/configurations/{configurationId}/options',
      path: {
        configurationId: data.configurationId,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }

  /**
   * Delete a configuration.
   * @param data The data for the request.
   * @param data.configurationId The ID of the configuration to delete.
   * @returns unknown Success
   * @throws ApiError
   */
  public deleteConfiguration(
    data: $OpenApiTs['/v2/providers/configurations/{configurationId}']['delete']['req']
  ): CancelablePromise<
    $OpenApiTs['/v2/providers/configurations/{configurationId}']['delete']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/v2/providers/configurations/{configurationId}',
      path: {
        configurationId: data.configurationId,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }
}

export class ResourcesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get an existing resource.
   * @param data The data for the request.
   * @param data.air A unique ID for the resource being requested. See https://developer.civitai.com/docs/getting-started/ai-resource-identifier for more info on AIRs.
   * @returns ResourceInfo Success
   * @throws ApiError
   */
  public getResource(
    data: $OpenApiTs['/v2/resources/{air}']['get']['req']
  ): CancelablePromise<$OpenApiTs['/v2/resources/{air}']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/resources/{air}',
      path: {
        air: data.air,
      },
      errors: {
        400: 'Bad Request',
        404: 'Not Found',
      },
    });
  }

  /**
   * Invalidates the cache of a specific resource.
   * @param data The data for the request.
   * @param data.air A unique ID for the resource being requested. See https://developer.civitai.com/docs/getting-started/ai-resource-identifier for more info on AIRs.
   * @returns void No Content
   * @throws ApiError
   */
  public invalidateResource(
    data: $OpenApiTs['/v2/resources/{air}']['delete']['req']
  ): CancelablePromise<$OpenApiTs['/v2/resources/{air}']['delete']['res'][204]> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/v2/resources/{air}',
      path: {
        air: data.air,
      },
      errors: {
        400: 'Bad Request',
      },
    });
  }
}

export class WorkerJobsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @param data The data for the request.
   * @param data.workerId
   * @param data.wait
   * @param data.take
   * @param data.claim
   * @returns Job Success
   * @throws ApiError
   */
  public getJobs(
    data: $OpenApiTs['/v2/providers/workers/{workerId}/jobs']['get']['req']
  ): CancelablePromise<$OpenApiTs['/v2/providers/workers/{workerId}/jobs']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/workers/{workerId}/jobs',
      path: {
        workerId: data.workerId,
      },
      query: {
        wait: data.wait,
        take: data.take,
        claim: data.claim,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }
}

export class WorkersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create a worker with a given registration.
   * @param data The data for the request.
   * @param data.requestBody The registration specifying the details of the worker to be created.
   * @returns CreateWorkerResult Created
   * @throws ApiError
   */
  public createWorker(
    data: $OpenApiTs['/v2/providers/workers']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/v2/providers/workers']['post']['res'][201]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/v2/providers/workers',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
      },
    });
  }

  /**
   * Query existing workers.
   * @returns WorkerDetails Success
   * @throws ApiError
   */
  public queryWorkers(): CancelablePromise<$OpenApiTs['/v2/providers/workers']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/workers',
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
      },
    });
  }

  /**
   * Gets the worker for the provided ID.
   * @param data The data for the request.
   * @param data.workerId The ID for the requested worker.
   * @returns WorkerDetails Success
   * @throws ApiError
   */
  public getWorker(
    data: $OpenApiTs['/v2/providers/workers/{workerId}']['get']['req']
  ): CancelablePromise<$OpenApiTs['/v2/providers/workers/{workerId}']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/workers/{workerId}',
      path: {
        workerId: data.workerId,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }

  /**
   * Delete a worker.
   * @param data The data for the request.
   * @param data.workerId The ID for the worker to be deleted.
   * @returns void No Content
   * @throws ApiError
   */
  public deleteWorker(
    data: $OpenApiTs['/v2/providers/workers/{workerId}']['delete']['req']
  ): CancelablePromise<$OpenApiTs['/v2/providers/workers/{workerId}']['delete']['res'][204]> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/v2/providers/workers/{workerId}',
      path: {
        workerId: data.workerId,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }

  /**
   * Gets the registration details for the specified worker.
   * @param data The data for the request.
   * @param data.workerId The ID of the worker whose registration is being requested.
   * @returns WorkerRegistration Success
   * @throws ApiError
   */
  public getRegistration(
    data: $OpenApiTs['/v2/providers/workers/{workerId}/registration']['get']['req']
  ): CancelablePromise<
    $OpenApiTs['/v2/providers/workers/{workerId}/registration']['get']['res'][200]
  > {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/providers/workers/{workerId}/registration',
      path: {
        workerId: data.workerId,
      },
      errors: {
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }

  /**
   * Update the registration details of the specified worker.
   * @param data The data for the request.
   * @param data.workerId The ID for the worker whose registration is being updated.
   * @param data.requestBody The registration details to update on the worker's registration.
   * @returns void No Content
   * @throws ApiError
   */
  public updateWorkerRegistration(
    data: $OpenApiTs['/v2/providers/workers/{workerId}/registration']['put']['req']
  ): CancelablePromise<
    $OpenApiTs['/v2/providers/workers/{workerId}/registration']['put']['res'][204]
  > {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/v2/providers/workers/{workerId}/registration',
      path: {
        workerId: data.workerId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }

  /**
   * Patch a worker's registration resources
   * @param data The data for the request.
   * @param data.workerId The ID for the worker whose registration resources are being patched.
   * @param data.requestBody A dictionary of resource AIRs and their corresponding status for on that worker.
   * @returns void No Content
   * @throws ApiError
   */
  public pathWorkerResources(
    data: $OpenApiTs['/v2/providers/workers/{workerId}/registration/resources']['patch']['req']
  ): CancelablePromise<
    $OpenApiTs['/v2/providers/workers/{workerId}/registration/resources']['patch']['res'][204]
  > {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/v2/providers/workers/{workerId}/registration/resources',
      path: {
        workerId: data.workerId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
      },
    });
  }
}

export class WorkflowsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Submit a workflow for processing
   * @param data The data for the request.
   * @param data.wait Whether to wait for the workflow to complete before returning or to return immediately
   * The request may return a 202 if the clients waits for the workflow to complete and the workflow does not complete within the requested timeout.
   * In which case the client should use the token to query the status of the workflow.
   * @param data.whatif Whether to actually submit the workflow or return an estimate on what would happen upon submission
   * @param data.requestBody
   * @returns Workflow Success
   * @throws ApiError
   */
  public submitWorkflow(
    data: $OpenApiTs['/v2/consumer/workflows']['post']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/v2/consumer/workflows']['post']['res'][200]> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/v2/consumer/workflows',
      query: {
        wait: data.wait,
        whatif: data.whatif,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad Request',
        401: 'Unauthorized',
      },
    });
  }

  /**
   * Query for workflows made by the user.
   * @param data The data for the request.
   * @param data.cursor An optional cursor to continue querying workflows from a previous query.
   * @param data.take How many workflows to return
   * @param data.jobType The type of job to filter on.
   * @returns CursedArrayOfTelemetryCursorAndWorkflow Success
   * @throws ApiError
   */
  public queryWorkflows(
    data: $OpenApiTs['/v2/consumer/workflows']['get']['req'] = {}
  ): CancelablePromise<$OpenApiTs['/v2/consumer/workflows']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/consumer/workflows',
      query: {
        cursor: data.cursor,
        take: data.take,
        jobType: data.jobType,
      },
      errors: {
        401: 'Unauthorized',
      },
    });
  }

  /**
   * Get the status of a workflow
   * @param data The data for the request.
   * @param data.workflowId The id of the workflow to get status for
   * @param data.wait Whether to wait for the workflow to complete before returning or to return immediately
   * The request may return a 202 if the clients waits for the workflow to complete and the workflow does not complete within the requested timeout.
   * In which case the client should use the token to query the status of the workflow.
   * @returns Workflow Success
   * @throws ApiError
   */
  public getWorkflow(
    data: $OpenApiTs['/v2/consumer/workflows/{workflowId}']['get']['req']
  ): CancelablePromise<$OpenApiTs['/v2/consumer/workflows/{workflowId}']['get']['res'][200]> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/v2/consumer/workflows/{workflowId}',
      path: {
        workflowId: data.workflowId,
      },
      query: {
        wait: data.wait,
      },
      errors: {
        401: 'Unauthorized',
        404: 'Not Found',
      },
    });
  }

  /**
   * Updates a request. This can currently be used to cancel a request.
   * @param data The data for the request.
   * @param data.workflowId The id of the request to update.
   * @param data.requestBody The details to update on the workflow.
   * @returns void No Content
   * @throws ApiError
   */
  public updateWorkflow(
    data: $OpenApiTs['/v2/consumer/workflows/{workflowId}']['put']['req']
  ): CancelablePromise<$OpenApiTs['/v2/consumer/workflows/{workflowId}']['put']['res'][204]> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/v2/consumer/workflows/{workflowId}',
      path: {
        workflowId: data.workflowId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        400: 'Bad Request',
        401: 'Unauthorized',
        404: 'Not Found',
      },
    });
  }

  /**
   * Deletes a workflow and all its jobs.
   * @param data The data for the request.
   * @param data.workflowId The id of the workflow to delete.
   * @returns void No Content
   * @throws ApiError
   */
  public deleteWorkflow(
    data: $OpenApiTs['/v2/consumer/workflows/{workflowId}']['delete']['req']
  ): CancelablePromise<$OpenApiTs['/v2/consumer/workflows/{workflowId}']['delete']['res'][204]> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/v2/consumer/workflows/{workflowId}',
      path: {
        workflowId: data.workflowId,
      },
      errors: {
        401: 'Unauthorized',
        404: 'Not Found',
      },
    });
  }
}
