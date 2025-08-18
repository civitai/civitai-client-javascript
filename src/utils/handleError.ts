import { ProblemDetails } from 'src/generated';

export function handleError(error: string | ProblemDetails) {
  if (typeof error === 'string') return error;
  const errors =
    error.errors && Array.isArray(error.errors)
      ? (error.errors as unknown as { messages: string[] })
      : undefined;
  const message = errors ? errors.messages.join('\n') : error.detail;
  return message === null ? undefined : message;
}
