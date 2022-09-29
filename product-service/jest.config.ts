import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '@libs/api-gateway': '<rootDir>/src/libs/api-gateway',
    '@libs/lambda': '<rootDir>/src/libs/lambda',
  },
}

export default config
