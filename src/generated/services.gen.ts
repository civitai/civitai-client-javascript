// This file is auto-generated by @hey-api/openapi-ts

import { client, type Options } from '@hey-api/client-fetch';
import type {
  GetBlobData,
  HeadBlobData,
  HeadBlobError,
  HeadBlobResponse,
  InvokeAgeClassificationStepTemplateData,
  InvokeAgeClassificationStepTemplateError,
  InvokeAgeClassificationStepTemplateResponse,
  InvokeComfyStepTemplateData,
  InvokeComfyStepTemplateError,
  InvokeComfyStepTemplateResponse,
  InvokeEchoStepTemplateData,
  InvokeEchoStepTemplateError,
  InvokeEchoStepTemplateResponse,
  InvokeImageGenStepTemplateData,
  InvokeImageGenStepTemplateError,
  InvokeImageGenStepTemplateResponse,
  InvokeImageResourceTrainingStepTemplateData,
  InvokeImageResourceTrainingStepTemplateError,
  InvokeImageResourceTrainingStepTemplateResponse,
  InvokeImageUploadStepTemplateData,
  InvokeImageUploadStepTemplateError,
  InvokeImageUploadStepTemplateResponse,
  InvokeTextToImageStepTemplateData,
  InvokeTextToImageStepTemplateError,
  InvokeTextToImageStepTemplateResponse,
  InvokeVideoEnhancementStepTemplateData,
  InvokeVideoEnhancementStepTemplateError,
  InvokeVideoEnhancementStepTemplateResponse,
  InvokeVideoGenStepTemplateData,
  InvokeVideoGenStepTemplateError,
  InvokeVideoGenStepTemplateResponse,
  GetResourceData,
  GetResourceError,
  GetResourceResponse,
  InvalidateResourceData,
  InvalidateResourceError,
  InvalidateResourceResponse,
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
  PatchWorkflowData,
  PatchWorkflowError,
  PatchWorkflowResponse,
  DeleteWorkflowData,
  DeleteWorkflowError,
  DeleteWorkflowResponse,
  AddWorkflowTagData,
  AddWorkflowTagError,
  AddWorkflowTagResponse,
  RemoveAllWorkflowTagsData,
  RemoveAllWorkflowTagsError,
  RemoveAllWorkflowTagsResponse,
  RemoveWorkflowTagData,
  RemoveWorkflowTagError,
  RemoveWorkflowTagResponse,
  GetWorkflowStepData,
  GetWorkflowStepError,
  GetWorkflowStepResponse,
  UpdateWorkflowStepData,
  UpdateWorkflowStepError,
  UpdateWorkflowStepResponse,
  PatchWorkflowStepData,
  PatchWorkflowStepError,
  PatchWorkflowStepResponse,
} from './types.gen';

/**
 * Get blob by ID. This will return the blob as a binary stream.
 */
export const getBlob = (options: Options<GetBlobData>) => {
  return (options?.client ?? client).get<void>({
    ...options,
    url: '/v2/consumer/blobs/{blobId}',
  });
};

/**
 * Handles HTTP HEAD requests for a specific blob, checking its existence and NSFW level.
 */
export const headBlob = (options: Options<HeadBlobData>) => {
  return (options?.client ?? client).head<HeadBlobResponse, HeadBlobError>({
    ...options,
    url: '/v2/consumer/blobs/{blobId}',
  });
};

/**
 * Age classification
 * Detects minors in media content. Returns a boolean value indicating whether the content contains minors as well as details on where minors are detected.
 */
export const invokeAgeClassificationStepTemplate = (
  options?: Options<InvokeAgeClassificationStepTemplateData>
) => {
  return (options?.client ?? client).post<
    InvokeAgeClassificationStepTemplateResponse,
    InvokeAgeClassificationStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/ageClassification',
  });
};

/**
 * Comfy workflows
 * Runs a comfy workflow. Currently there are limited nodes available. Contact support for more information.
 */
export const invokeComfyStepTemplate = (options?: Options<InvokeComfyStepTemplateData>) => {
  return (options?.client ?? client).post<
    InvokeComfyStepTemplateResponse,
    InvokeComfyStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/comfy',
  });
};

/**
 * Echo
 * A workflow step that takes a message string and retuns it.
 * /// This step is intended for testing purposes.
 */
export const invokeEchoStepTemplate = (options?: Options<InvokeEchoStepTemplateData>) => {
  return (options?.client ?? client).post<
    InvokeEchoStepTemplateResponse,
    InvokeEchoStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/echo',
  });
};

/**
 * Image Generation
 * Generate images through text/image inputs using any of our supported engines
 */
export const invokeImageGenStepTemplate = (options?: Options<InvokeImageGenStepTemplateData>) => {
  return (options?.client ?? client).post<
    InvokeImageGenStepTemplateResponse,
    InvokeImageGenStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/imageGen',
  });
};

/**
 * LORA Training
 * Train LORA's
 */
export const invokeImageResourceTrainingStepTemplate = (
  options?: Options<InvokeImageResourceTrainingStepTemplateData>
) => {
  return (options?.client ?? client).post<
    InvokeImageResourceTrainingStepTemplateResponse,
    InvokeImageResourceTrainingStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/imageResourceTraining',
  });
};

/**
 * Image upload
 * Uploads an image to be used in a workflow
 */
export const invokeImageUploadStepTemplate = (
  options?: Options<InvokeImageUploadStepTemplateData>
) => {
  return (options?.client ?? client).post<
    InvokeImageUploadStepTemplateResponse,
    InvokeImageUploadStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/imageUpload',
  });
};

/**
 * TextToImage
 * Generate images using text as input
 */
export const invokeTextToImageStepTemplate = (
  options?: Options<InvokeTextToImageStepTemplateData>
) => {
  return (options?.client ?? client).post<
    InvokeTextToImageStepTemplateResponse,
    InvokeTextToImageStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/textToImage',
  });
};

/**
 * Upscale videos and/or interpolate frames
 */
export const invokeVideoEnhancementStepTemplate = (
  options?: Options<InvokeVideoEnhancementStepTemplateData>
) => {
  return (options?.client ?? client).post<
    InvokeVideoEnhancementStepTemplateResponse,
    InvokeVideoEnhancementStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/videoEnhancement',
  });
};

/**
 * Video generation
 * Generate videos through text/image inputs using any of our supported engines
 */
export const invokeVideoGenStepTemplate = (options?: Options<InvokeVideoGenStepTemplateData>) => {
  return (options?.client ?? client).post<
    InvokeVideoGenStepTemplateResponse,
    InvokeVideoGenStepTemplateError
  >({
    ...options,
    url: '/v2/consumer/recipes/videoGen',
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

/**
 * Submit workflow
 */
export const submitWorkflow = (options?: Options<SubmitWorkflowData>) => {
  return (options?.client ?? client).post<SubmitWorkflowResponse, SubmitWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows',
  });
};

/**
 * Query workflows
 */
export const queryWorkflows = (options?: Options<QueryWorkflowsData>) => {
  return (options?.client ?? client).get<QueryWorkflowsResponse, QueryWorkflowsError>({
    ...options,
    url: '/v2/consumer/workflows',
  });
};

/**
 * Get workflow
 */
export const getWorkflow = (options: Options<GetWorkflowData>) => {
  return (options?.client ?? client).get<GetWorkflowResponse, GetWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Update workflow
 * Updates a worfklow. This can currently be used to cancel a worfklow or override metadata and/or tags
 */
export const updateWorkflow = (options: Options<UpdateWorkflowData>) => {
  return (options?.client ?? client).put<UpdateWorkflowResponse, UpdateWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Patch workflow
 * Patches a worfklow using JSON Patch. This can currently be used to cancel a worfklow, update metadata and add additional tags
 */
export const patchWorkflow = (options: Options<PatchWorkflowData>) => {
  return (options?.client ?? client).patch<PatchWorkflowResponse, PatchWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Delete workflow
 * This will delete a workflow. This may trigger a refund if the work requested with this workflow has not yet started
 */
export const deleteWorkflow = (options: Options<DeleteWorkflowData>) => {
  return (options?.client ?? client).delete<DeleteWorkflowResponse, DeleteWorkflowError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}',
  });
};

/**
 * Add workflow tag
 * Adds a tag to a workflow
 */
export const addWorkflowTag = (options: Options<AddWorkflowTagData>) => {
  return (options?.client ?? client).post<AddWorkflowTagResponse, AddWorkflowTagError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/tags',
  });
};

/**
 * Delete all workflow tags
 */
export const removeAllWorkflowTags = (options: Options<RemoveAllWorkflowTagsData>) => {
  return (options?.client ?? client).delete<
    RemoveAllWorkflowTagsResponse,
    RemoveAllWorkflowTagsError
  >({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/tags',
  });
};

/**
 * Delete workflow tag
 */
export const removeWorkflowTag = (options: Options<RemoveWorkflowTagData>) => {
  return (options?.client ?? client).delete<RemoveWorkflowTagResponse, RemoveWorkflowTagError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/tags/{tag}',
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

export const patchWorkflowStep = (options: Options<PatchWorkflowStepData>) => {
  return (options?.client ?? client).patch<PatchWorkflowStepResponse, PatchWorkflowStepError>({
    ...options,
    url: '/v2/consumer/workflows/{workflowId}/steps/{stepName}',
  });
};
