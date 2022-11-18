import { handlerPath } from "@libs/handler-resolver";
import { AWS } from "@serverless/typescript";

export const importProductsFile: AWS["functions"]["k"] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "/import",
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          arn: "arn:aws:lambda:eu-west-1:203651338148:function:authorization-service-dev-basicAuthorizer",
          type: "request",
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0
        },
      },
    },
  ],
};
