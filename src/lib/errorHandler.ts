export const ErrorHandler = (code: string) => {
  switch (code) {
    case 'P2002':
      return { status: 400, error: 'User with this email already exists' };
    default:
      return { status: 400, error: 'unknown error' };
  }
};
