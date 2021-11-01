/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env';

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),
  NEO4J_HOST: Env.schema.string(),
  NEO4J_USER: Env.schema.string(),
  NEO4J_PASSWORD: Env.schema.string(),
  MONGO_DB: Env.schema.string(),
  MONGO_URI: Env.schema.string(),
  MONGO_USER: Env.schema.string(),
  MONGO_PASSWORD: Env.schema.string(),
  HASH_SECRET: Env.schema.string(),
});
