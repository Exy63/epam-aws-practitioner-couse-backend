import AWSMock from 'aws-sdk-mock'
import {
  CopyObjectRequest,
  DeleteObjectRequest,
  GetObjectRequest,
} from 'aws-sdk/clients/s3'
import { main as importFileParser } from '../../../src/functions/importFileParser/handler'
const fs = require('fs')

const s3Path = 'tests/unit/importProductsFile/s3'
const testFileName = 'test-file.csv'

/** Cleans mocked S3 directories */
const emptyDirectories = (): void => {
  const foldersToClean = ['uploaded', 'parsed']

  foldersToClean.forEach((folderName) => {
    const files: string[] = fs.readdirSync(`${s3Path}/${folderName}`)
    if (files.length) {
      files.forEach((file) => fs.unlinkSync(`${s3Path}/${folderName}/${file}`))
    }
  })
}

/** Uploads test file into s3 */
const initTestFile = (): void => {
  fs.copyFileSync(
    `tests/unit/importProductsFile/${testFileName}`,
    `${s3Path}/uploaded/${testFileName}`
  )
}

/** Clean S3 and init test file */
beforeAll(() => {
  emptyDirectories()
  initTestFile()
})

/** Clean Up */
afterAll(() => {
  emptyDirectories()
})

/** MOCKS */
AWSMock.mock(
  'S3',
  'getObject',
  (params: GetObjectRequest, callback: Function) =>
    callback(null, {
      file: Buffer.from(
        fs.readFileSync(`${s3Path}/uploaded/${testFileName}`)
      ).toString(),
    })
)
AWSMock.mock(
  'S3',
  'copyObject',
  (params: CopyObjectRequest, callback: Function) =>
    callback(null, {
      res: fs.copyFileSync(
        `${s3Path}/uploaded/${testFileName}`,
        `${s3Path}/parsed/${testFileName}`
      ),
    })
)
AWSMock.mock(
  'S3',
  'deleteObject',
  (params: DeleteObjectRequest, callback: Function) =>
    callback(null, {
      res: fs.unlinkSync(`${s3Path}/uploaded/${testFileName}`),
    })
)

describe('importProductsFile handler tests', () => {
  it('checks is test file uploaded to S3', async () => {
    expect(fs.existsSync(`${s3Path}/uploaded/${testFileName}`)).toBe(true)
  })

  it('checks is S3 parsed directory empty', async () => {
    expect(fs.readdirSync(`${s3Path}/parsed`).length).toBe(0)
  })

  it('tests importProductsFile on success', async () => {
    await importFileParser({
      Records: [{ s3: { object: { key: `parsed/${testFileName}` } } }],
    })

    // copied to parsed
    expect(fs.readdirSync(`${s3Path}/parsed`).length).toBe(1)
    expect(fs.readdirSync(`${s3Path}/parsed`).includes(testFileName)).toBe(true)

    // deleted from uploaded
    expect(fs.readdirSync(`${s3Path}/uploaded`).length).toBe(0)
  })
})
