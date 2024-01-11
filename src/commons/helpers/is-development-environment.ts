export const isDevelopmentEnvironment = (): boolean =>
  ['local', 'dev'].includes(process.env.NODE_ENV);
