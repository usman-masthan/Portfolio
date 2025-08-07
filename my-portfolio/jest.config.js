const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // If using TypeScript with a baseUrl set to the root directory
  // then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Handle module aliases (adjust as needed for your project)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Coverage settings
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
  ],
  
  // Test patterns
  testMatch: [
    '**/__tests__/**/*.(js|jsx)',
    '**/*.(test|spec).(js|jsx)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);