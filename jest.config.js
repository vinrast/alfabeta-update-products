// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
})

module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/**/*.ts',
  ],
  coverageDirectory: '__tests__/coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./__tests__/utils/jest.setup.ts'],
  globalSetup: './__tests__/utils/setup.ts',
  globalTeardown: './__tests__/utils/teardown.ts',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts?(x)'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper,
  modulePaths: ['<rootDir>/'],
  maxWorkers: '2',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
