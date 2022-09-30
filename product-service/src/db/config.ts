import {
  PRODUCTS_TABLE_NAME,
  STOCKS_TABLE_NAME,
} from '@db/constants/table-name.constants'

export default {
  ProductsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: PRODUCTS_TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  },
  StocksTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: STOCKS_TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'product_id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'product_id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  },
}
