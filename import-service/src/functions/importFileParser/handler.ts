import { formatJSONErrorResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
const csv = require('csv-parser')
import * as AWS from 'aws-sdk'

const importFileParser = async (event: any) => {
  const s3 = new AWS.S3({ region: 'eu-west-1' })
  const sqs = new AWS.SQS()
  console.log('Lambda importFileParser is invoked! Event: ', event)

  try {
    const csvKey = event.Records[0].s3.object.key
    const [oldPrefix, fileName] = csvKey.split('/')
    const newPrefix = 'parsed'

    const paramsToRead = {
      Bucket: process.env.IMPORT_BUCKET_NAME,
      Key: `${oldPrefix}/${fileName}`,
    }
    const paramsToWrite = {
      Bucket: process.env.IMPORT_BUCKET_NAME,
      CopySource: `${process.env.IMPORT_BUCKET_NAME}/${oldPrefix}/${fileName}`,
      Key: `${newPrefix}/${fileName}`,
    }

    const readStream = s3.getObject(paramsToRead).createReadStream()
    await new Promise<void>((resolve, reject) => {
      readStream
        .pipe(csv())
        .on('data', (chunk) => {
          console.log('🚀 ~ chunk', chunk)
          const message = JSON.stringify(chunk)
          sqs.sendMessage(
            { QueueUrl: process.env.SQS_URL, MessageBody: message },
            () => {
              console.log('Send message: ', message)
            }
          )
        })
        .on('error', (err) => {
          reject(err)
        })
        .on('end', () => {
          resolve()
        })
    })

    const isCopied = await new Promise<AWS.S3.CopyObjectOutput>(
      (resolve, reject) => {
        s3.copyObject(paramsToWrite, (err, data) => {
          if (err) reject(err) // error
          else resolve(data) // success
        })
      }
    )

    if (isCopied) {
      new Promise<AWS.S3.DeleteObjectOutput>((resolve, reject) => {
        s3.deleteObject(paramsToRead, (err) => {
          if (err) reject(err) // error
          else resolve({}) // success
        })
      })
    }
  } catch (e) {
    return formatJSONErrorResponse('Bad Request', 400)
  }
}

export const main = middyfy(importFileParser)
