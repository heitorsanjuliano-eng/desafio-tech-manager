import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testRegex: '.*\\.spec\\.ts$',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;