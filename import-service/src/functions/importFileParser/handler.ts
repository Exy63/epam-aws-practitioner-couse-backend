import { middyfy } from '@libs/lambda'
const csv = require('csv-parser')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'eu-west-1' })

const BUCKET = 'superstore-import'

const importFileParser = async (event: any) => {
  console.log('Lambda importFileParser is invoked! Event: ', event)

  const csvKey = event.Records[0].s3.object.key
  const [oldPrefix, fileName] = csvKey.split('/')
  const newPrefix = 'parsed'

  const paramsToRead = { Bucket: BUCKET, Key: `${oldPrefix}/${fileName}` }
  const paramsToWrite = {
    Bucket: BUCKET,
    CopySource: `${BUCKET}/${oldPrefix}/${fileName}`,
    Key: `${newPrefix}/${fileName}`,
  }

  const readStream = s3.getObject(paramsToRead).createReadStream()
  await new Promise<void>((resolve, reject) => {
    readStream
      .pipe(csv())
      .on('data', (chunk) => {
        console.log('🚀 chunk ->', chunk)
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('end', () => {
        resolve()
      })
  })

  const isCopied = await new Promise<any>((resolve, reject) => {
    s3.copyObject(paramsToWrite, (err, data) => {
      if (err) reject(err) // error
      else resolve(data) // success
    })
  })

  if (isCopied) {
    new Promise<void>((resolve, reject) => {
      s3.deleteObject(paramsToRead, function (err, data) {
        if (err) reject(err) // error
        else resolve(data) // success
      })
    })
  }
}

export const main = middyfy(importFileParser)
