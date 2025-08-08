import { ProblemDetails } from 'src/generated';

export function handleError(error: string | ProblemDetails) {
  if (typeof error === 'string') return error;
  const message =
    error.messages && Array.isArray(error.messages) ? error.messages.join('\n') : error.detail;
  return message === null ? undefined : message;
}
