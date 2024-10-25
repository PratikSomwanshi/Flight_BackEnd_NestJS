export function createErrorResponse(error: unknown) {
  return {
    status: false,
    message: 'Something Went Wrong',
    data: {},
    error: {
      explanation: error,
    },
  };
}

export function createSuccessResponse(message: string, data: unknown = {}) {
  return {
    status: true,
    message: message,
    data: data,
    error: {},
  };
}
