/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly URL_CLIENT: string;
  readonly SERVER_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
