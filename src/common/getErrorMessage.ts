export const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return undefined;
};

export default getErrorMessage;
