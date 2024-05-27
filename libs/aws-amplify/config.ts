export const config = {
    apiGateway: {
      REGION: process.env.EXPO_PUBLIC_REGION,
      URL: process.env.EXPO_PUBLIC_API_URL,
    },
    cognito: {
      REGION: process.env.EXPO_PUBLIC_REGION,
      USER_POOL_ID: process.env.EXPO_PUBLIC_USER_POOL_ID,
      APP_CLIENT_ID: process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.EXPO_PUBLIC_IDENTITY_POOL_ID,
    },
  };
  