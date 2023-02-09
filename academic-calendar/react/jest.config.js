// jest.config.js

// Get the full path to our env.jest file
const path = require('path');
const envFile = path.join(__dirname, 'env.jest');

// Read the environment variables we use for Jest from our env.jest file
require('dotenv').config({ path: envFile });

// Set our Jest options, see https://jestjs.io/docs/configuration
module.exports = {
    verbose: true,
    testTimeout: 5000,
    setupFiles: ["<rootDir>/.jest/environment.js"],
    testEnvironment: "jest-environment-jsdom"
};