import { handlerPath } from '@libs/handler-resolver'

export const getProductList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
}
