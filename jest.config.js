module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+spec.+(ts|tsx|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/index.ts',
    '!**/types.ts',
    '!**/__fixtures__/**',
    '!**/__mocks__/**',
  ],
};
