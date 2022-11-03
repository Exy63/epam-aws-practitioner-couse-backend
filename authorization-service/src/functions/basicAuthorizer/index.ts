import { handlerPath } from "@libs/handler-resolver";
import { AWS } from "@serverless/typescript";

export const basicAuthorizer: AWS["functions"]["k"] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
};
