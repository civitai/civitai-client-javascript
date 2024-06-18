import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { BlobsService } from './services.gen';
import { ConfigurationsService } from './services.gen';
import { ResourcesService } from './services.gen';
import { WorkerJobsService } from './services.gen';
import { WorkersService } from './services.gen';
import { WorkflowsService } from './services.gen';
import { WorkflowStepsService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class GeneratedClient {
  public readonly blobs: BlobsService;
  public readonly configurations: ConfigurationsService;
  public readonly resources: ResourcesService;
  public readonly workerJobs: WorkerJobsService;
  public readonly workers: WorkersService;
  public readonly workflows: WorkflowsService;
  public readonly workflowSteps: WorkflowStepsService;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = FetchHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '2',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.blobs = new BlobsService(this.request);
    this.configurations = new ConfigurationsService(this.request);
    this.resources = new ResourcesService(this.request);
    this.workerJobs = new WorkerJobsService(this.request);
    this.workers = new WorkersService(this.request);
    this.workflows = new WorkflowsService(this.request);
    this.workflowSteps = new WorkflowStepsService(this.request);
  }
}
