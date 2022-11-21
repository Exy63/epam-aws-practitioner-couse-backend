import { APIGatewayEvent } from 'aws-lambda';
import { throwError, formatResponseError, formatResponseOK } from '@helpers';
import { isUUID } from 'validator';
import { CartController } from 'src/cart/cart.controller';
import { CartService } from 'src/cart';
import { OrderService } from 'src/order';
import { AppRequest } from 'src/shared';

export const clearUserCart = async (event: APIGatewayEvent) => {
  console.log(`Lambda clearUserCart is invoked!`, event);
  try {
    const { id } = event.pathParameters;
    if (!isUUID(id)) throwError('Not valid ID', 400);

    const cartController = new CartController(
      new CartService(),
      new OrderService(),
    );

    await cartController.clearUserCart({
      user: {
        id,
      },
    } as AppRequest);

    return formatResponseOK();
  } catch (e) {
    return formatResponseError(e);
  }
};
