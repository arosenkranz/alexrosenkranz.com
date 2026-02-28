/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare const __APP_VERSION__: string;

type CloudflareEnv = {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>;

declare namespace App {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Locals extends Runtime {}
}

interface Window {
  DD_RUM?: {
    addAction: (name: string, context?: Record<string, unknown>) => void;
  };
}
