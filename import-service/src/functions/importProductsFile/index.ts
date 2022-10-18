import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export const importProductsFile: AWS['functions']['k'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
}
