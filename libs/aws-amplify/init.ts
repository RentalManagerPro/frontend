import { config } from "./config";
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CustomTokenStorage } from "./customTokenStorage";

/**
 * Initializes the AWS Amplify configuration with the provided Cognito user pool and API Gateway endpoint.
 *
 * @return {void} This function does not return anything.
 */
export function init() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: config.cognito.USER_POOL_ID as string,
        userPoolClientId: config.cognito.APP_CLIENT_ID as string,
        identityPoolId: config.cognito.IDENTITY_POOL_ID as string,
      },
    },
    API: {
      REST: {
        hello: {
          endpoint: config.apiGateway.URL as string,
          region: config.apiGateway.REGION,
          service: "hello",
        },
      },
    },
  });
  cognitoUserPoolsTokenProvider.setKeyValueStorage(new CustomTokenStorage());
}
