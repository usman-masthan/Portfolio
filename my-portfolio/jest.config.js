const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/app/(.*)$': '<rootDir>/app/$1',
        '^@/(.*)$': '<rootDir>/$1'
    },
    moduleDirectories: ['node_modules', '<rootDir>'],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ]
}

module.exports = createJestConfig(customJestConfig)