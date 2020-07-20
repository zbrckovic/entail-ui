const path = require('path')

const SRC_DIR = path.resolve(__dirname, './src')
const NODE_MODULES_DIR = path.resolve(__dirname, './node_modules')

module.exports = {
  verbose: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleDirectories: [NODE_MODULES_DIR, SRC_DIR]
}
