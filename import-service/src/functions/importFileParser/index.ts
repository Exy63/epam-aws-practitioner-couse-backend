import { handlerPath } from '@libs/handler-resolver'
import type { AWS } from '@serverless/typescript'

export const importFileParser: AWS['functions']['k'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'superstore-import',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
          },
        ],
        existing: true,
      },
    },
  ],
}
