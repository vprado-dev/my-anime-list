declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;

    // Api
    API_NAME: string;
    API_TOKEN: string;
    API_IMAGE: string;

    // Database
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;

    // Migrations
    MIGRATIONS_ENABLED: "0" | "1";
  }
}
