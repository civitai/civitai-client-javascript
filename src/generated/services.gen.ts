// This file is auto-generated by @hey-api/openapi-ts

import { client, type Options } from '@hey-api/client-fetch';
import type {
  GetBlobData,
  CreateConfigurationData,
  CreateConfigurationError,
  CreateConfigurationResponse,
  QueryConfigurationsError,
  QueryConfigurationsResponse,
  GetConfigurationData,
  GetConfigurationError,
  GetConfigurationResponse,
  DeleteConfigurationData,
  DeleteConfigurationError,
  DeleteConfigurationResponse,
  GetResourceData,
  GetResourceError,
  GetResourceResponse,
  InvalidateResourceData,
  InvalidateResourceError,
  InvalidateResourceResponse,
  GetJobsData,
  GetJobsError,
  GetJobsResponse,
  CreateWorkerData,
  CreateWorkerError,
  CreateWorkerResponse,
  QueryWorkersError,
  QueryWorkersResponse,
  GetWorkerData,
  GetWorkerError,
  GetWorkerResponse,
  DeleteWorkerData,
  DeleteWorkerError,
  DeleteWorkerResponse,
  GetRegistrationData,
  GetRegistrationError,
  GetRegistrationResponse,
  UpdateWorkerRegistrationData,
  UpdateWorkerRegistrationError,
  UpdateWorkerRegistrationResponse,
  PathWorkerResourcesData,
  PathWorkerResourcesError,
  PathWorkerResourcesResponse,
  SubmitWorkflowData,
  SubmitWorkflowError,
  SubmitWorkflowResponse,
  QueryWorkflowsData,
  QueryWorkflowsError,
  QueryWorkflowsResponse,
  GetWorkflowData,
  GetWorkflowError,
  GetWorkflowResponse,
  UpdateWorkflowData,
  UpdateWorkflowError,
  UpdateWorkflowResponse,
  DeleteWorkflowData,
  DeleteWorkflowError,
  DeleteWorkflowResponse,
  GetWorkflowStepData,
  GetWorkflowStepError,
  GetWorkflowStepResponse,
  UpdateWorkflowStepData,
  UpdateWorkflowStepError,
  UpdateWorkflowStepResponse,
} from './types.gen';

/**
 * Get blob by ID.
 */
export const getBlob = (options: Options<GetBlobData>) => {
  return (options?.client ?? client).get<void>({
    ...options,
    url: '/v2/consumer/blobs/{blobId}',
  });
};

/**
 * Create a new configuration.
 */
export const createConfiguration = (options?: Options<CreateConfigurationData>) => {
  return (options?.client ?? client).post<CreateConfigurationResponse, CreateConfigurationError>({
    ...options,
    url: '/v2/providers/configurations',
  });
};

/**
 * Query for existing configurations.
 */
export const queryConfigurations = (options?: Options) => {
  return (options?.client ?? client).get<QueryConfigurationsResponse, QueryConfigurationsError>({
    ...options,
    url: '/v2/providers/configurations',
  });
};

/**
 * Get options for a configuration.
 */
export const getConfiguration = (options: Options<GetConfigurationData>) => {
  return (options?.client ?? client).get<GetConfigurationResponse, GetConfigurationError>({
    ...options,
    url: '/v2/providers/configurations/{configurationId}/options',
  });
};

/**
 * Delete a configuration.
 */
export const deleteConfiguration = (options: Options<DeleteConfigurationData>) => {
  return (options?.client ?? client).delete<DeleteConfigurationResponse, DeleteConfigurationError>({
    ...options,
    url: '/v2/providers/configurations/{configurationId}',
  });
};

/**
 * Get an existing resource.
 */
export const getResource = (options: Options<GetResourceData>) => {
  return (options?.client ?? client).get<GetResourceResponse, GetResourceError>({
    ...options,
    url: '/v2/resources/{air}',
  });
};

/**
 * Invalidates the cache of a specific resource.
 */
export const invalidateResource = (options: Options<InvalidateResourceData>) => {
  return (options?.client ?? client).delete<InvalidateResourceResponse, InvalidateResourceError>({
    ...options,
    url: '/v2/resources/{air}',
  });
};

export const getJobs = (options: Options<GetJobsData>) => {
  return (options?.client ?? client).get<GetJobsResponse, GetJobsError>({
    ...options,
    url: '/v2/providers/workers/{workerId}/jobs',
  });
};

/**
 * Create a worker with a given registration.
 */
export const createWorker = (options?: Options<CreateWorkerData>) => {
  return (options?.client ?? client).post<CreateWorkerResponse, CreateWorkerError>({
    ...options,
    url: '/v2/providers/workers',
  });
};

/**
 * Query existing workers.
 */
export const queryWorkers = (options?: Options) => {
  return (options?.client ?? client).get<QueryWorkersResponse, QueryWorkersError>({
    ...options,
    url: '/v2/providers/workers',
  });
};

/**
 * Gets the worker for the provided ID.
 */
export const getWorker = (options: Options<GetWorkerData>) => {
  return (options?.client ?? client).get<GetWorkerResponse, GetWorkerError>({
    ...options,
    url: '/v2/providers/workers/{workerId}',
  });
};

/**
 * Delete a worker.
 */
export const deleteWorker = (options: Options<DeleteWorkerData>) => {
  return (options?.client ?? client).delete<DeleteWorkerResponse, DeleteWorkerError>({
    ...options,
    url: '/v2/providers/workers/{workerId}',
  });
};

/**
 * Gets the registration details for the specified worker.
 */
export const getRegistration = (options: Options<GetRegistrationData>) => {
  return (options?.client ?? client).get<GetRegistrationResponse, GetRegistrationError>({
    ...options,
    url: '/v2/providers/workers/{workerId}/registration',
  });
};

/**
 * Update the registration details of the specified worker.
 */
export const updateWorkerRegistration = (options: Options<UpdateWorkerRegistrationData>) => {
  return (options?.client ?? client).put<
    UpdateWorkerRegistrationResponse,
    UpdateWorkerRegistrationError
  >({
    ...options,
    url: '/v2/providers/workers/{workerId}/registration',
  });
};

/**
 * Patch a worker's registration resources
 */
export const pathWorkerResources = (options: Options<PathWorkerResourcesData>) => {
  return (options?.client ?? client).patch<PathWorkerResourcesResponse, PathWorkerResourcesError>({
    ...options,
    url: '/v2/providers/workers/{workerId}/registration/resources',
  });
};

/**
 * Submit a workflow for processing
 */
export const submitWorkflow = (options?: Options<SubmitWorkflowData>) => {
  return (options?.client ?? client).post<SubmitWorkflowResponse, SubmitWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows',
  });
};

/**
 * Query for workflows made by the user.
 */
export const queryWorkflows = (options?: Options<QueryWorkflowsData>) => {
  return (options?.client ?? client).get<QueryWorkflowsResponse, QueryWorkflowsError>({
    ...options,
    url: '/v2/consumer/workflows',
  });
};

/**
 * Get the status of a workflow
 */
export const getWorkflow = (options: Options<GetWorkflowData>) => {
  return (options?.client ?? client).get<GetWorkflowResponse, GetWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Updates a worfklow. This can currently be used to cancel a worfklow.
 */
export const updateWorkflow = (options: Options<UpdateWorkflowData>) => {
  return (options?.client ?? client).put<UpdateWorkflowResponse, UpdateWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Deletes a workflow and all its jobs.
 */
export const deleteWorkflow = (options: Options<DeleteWorkflowData>) => {
  return (options?.client ?? client).delete<DeleteWorkflowResponse, DeleteWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Get the status of a workflow step
 */
export const getWorkflowStep = (options: Options<GetWorkflowStepData>) => {
  return (options?.client ?? client).get<GetWorkflowStepResponse, GetWorkflowStepError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/steps/{stepName}',
  });
};

/**
 * Updates a step within a particular workflow.
 */
export const updateWorkflowStep = (options: Options<UpdateWorkflowStepData>) => {
  return (options?.client ?? client).put<UpdateWorkflowStepResponse, UpdateWorkflowStepError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/steps/{stepName}',
  });
};
