import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";

const basicAuthorizer = async (event: APIGatewayEvent) => {
  console.log("Lambda basicAuthorizer is invoked Event: ", event);

  try {
    const authHeaderValue = event.headers?.Authorization;
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
    if (!isAuthorized) {
      return formatJSONResponse(
        {
          message: `Invalid login or password!`,
        },
        403
      );
    }

    return formatJSONResponse({
      message: `Your token is valid! Welcome aboard!`,
    });
  } catch (e) {
    return formatJSONResponse(
      {
        message: e,
      },
      401
    );
  }
};

export const main = middyfy(basicAuthorizer);
