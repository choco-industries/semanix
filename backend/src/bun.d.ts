declare module "bun" {
  interface Env {
    AUTH_SECRET: string;
    AUTH_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    S3_ACCOUNT_ID: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
    S3_PUBLIC_BUCKET_URL: string;
    S3_BUCKET_NAME: string;

    DEEPINFRA_API_KEY: string;

    QDRANT_URL: string;

    GMAIL_API_KEY: string;
  }
}
