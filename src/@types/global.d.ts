import { buildContext } from '../plugins/graphql';

declare namespace NodeJS {
  export type Environment = 'production' | 'development' | 'staging';

  export interface ProcessEnv {
    APP_DOMAIN: string;
    NODE_ENV: Environment;
    PORT: string;
    PGHOST: string;
    PGPORT: string;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}

type Promisetype<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
  interface MercuriusContext
    extends Promisetype<ReturnType<typeof buildContext>> {}
}
