const path = require('path')
const Dotenv = require('dotenv-webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

const gitRevisionPlugin = new GitRevisionPlugin()

const STORYBOOK_DIR = __dirname
const SRC_DIR = path.resolve(__dirname, '../src')
const NODE_MODULES_DIR = path.resolve(__dirname, '../node_modules')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async (config, { configType }) => {
    const development = configType === 'DEVELOPMENT'

    config.resolve.modules = [STORYBOOK_DIR, NODE_MODULES_DIR, SRC_DIR]

    config.plugins.push(
      new EnvironmentPlugin({
        DEVELOPMENT: JSON.stringify(development),
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch()
      }),
      new Dotenv()
    )

    return config
  }
}


