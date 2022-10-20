import { middyfy } from '@libs/lambda'
const csv = require('csv-parser')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'eu-west-1' })

const BUCKET = 'superstore-import'

const importFileParser = async (event: any) => {
  console.log('Lambda importFileParser is invoked! Event: ', event)
  const records = event.Records[0]

  const params = { Bucket: BUCKET, Key: records.s3.object.key }

  const readStream = s3.getObject(params).createReadStream()

  await new Promise(() => {
    readStream.pipe(csv()).on('data', (chunk) => {
      console.log('🚀 chunk ->', chunk)
    })
  })
}

export const main = middyfy(importFileParser)
