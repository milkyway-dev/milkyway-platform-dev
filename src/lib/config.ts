const _config = {
  server: process.env.NEXT_PUBLIC_SERVER_URL,
  secretKey: process.env.NEXT_PUBLIC_JWT_TOKEN,
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  loaderUrl: process.env.NEXT_PUBLIC_LOADER_URL,
  platform: process.env.NEXT_PUBLIC_PLATFORM,
  domain: ".milkyway-casino.com",
  namespace: process.env.NEXT_PUBLIC_GAME_NAMESPACE,
};

export const config = Object.freeze(_config);
