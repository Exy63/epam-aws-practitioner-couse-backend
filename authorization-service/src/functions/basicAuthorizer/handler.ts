import { middyfy } from "@libs/lambda";
import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  console.log("Lambda basicAuthorizer is invoked Event: ", event);

  try {
    const authHeaderValue = event?.authorizationToken;
    if (!authHeaderValue) {
      throw `Token is not provided`;
    }

    const encodedToken = authHeaderValue.split(" ")?.[1];
    if (!encodedToken) {
      throw "Passed token is not valid. Please provide a valid token for Basic authentication.";
    }

    const decodedToken = Buffer.from(encodedToken, "base64").toString("utf-8");
    const [username, password] = decodedToken.split(":");
    if (!username || !password) {
      throw "Could not parse the token. Please provide a valid token for Basic authentication.";
    }

    const isAuthorized = process.env[username] === password;
    if (!isAuthorized) throw "Login or password is incorrect";

    return generatePolicy(true);
  } catch (e) {
    console.log(JSON.stringify({ errorMessage: e }));
    return generatePolicy(false);
  }
};

const generatePolicy = (isAllowed = false) => ({
  principalId: "token",
  policyDocument: {
    Version: "2012-10-17",
    Statement: {
      Action: "execute-api:Invoke",
      Effect: isAllowed ? "Allow" : "Deny",
      Resource: "*",
    },
  },
});

export const main = middyfy(basicAuthorizer);
