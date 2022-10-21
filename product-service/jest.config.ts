import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
}

export default config
