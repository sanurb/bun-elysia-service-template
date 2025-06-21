import { config } from 'dotenv';
import { Singleton } from 'tstl';
import typia from 'typia';

/**
 * Application environment configuration variables.
 */
export interface AppEnvironment {
  PORT: `${number}`;
}

const environmentSingleton = new Singleton<AppEnvironment>(
  (): AppEnvironment => {
    config();
    return typia.assert<AppEnvironment>(process.env);
  }
);

export const env: AppEnvironment = environmentSingleton.get();
