import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export const catalogBatchProcess: AWS['functions']['k'] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: '', // TODO
        batchSize: 2,
      },
    },
  ],
}
