export const debug = {
  error: (module: string, message: string) => {
    // TODO: Send the error messages to Sentry
    // TODO: Don't throw in Production
    // eslint-disable-next-line no-console -- only for debug
    console.error(`${module}: ${message}`);
  },
};
