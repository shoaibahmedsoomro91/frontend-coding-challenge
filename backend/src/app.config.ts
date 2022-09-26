import * as pkg from '../package.json';

const mode = 'development';

const env = {
  default: {  },
  development: {
    port: 5000
  },
  production: {
    port: 5000
  } 
};

export const config = {
  pkg,
  mode,
  basePath: 'api',
  ...env[ mode ], ...env.default
};