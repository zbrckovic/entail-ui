const path = require('path')
const Dotenv = require('dotenv-webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    '@storybook/addon-viewport',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async (config, { configType }) => {
    const development = configType === 'DEVELOPMENT'

    config.resolve.modules = [STORYBOOK_DIR, NODE_MODULES_DIR, SRC_DIR]

    config.module.rules.push({
      test: /\.s[ac]ss$/,
      oneOf: [
        {
          test: /\.m\.s[ac]ss$/,
          use: [
            development ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: development
                    ? '[path][name]_[local][hash:base64:5]'
                    : '[hash:base64]'
                },
                sourceMap: development
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: development }
            }
          ]
        },
        {
          use: [
            development ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: development
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: development }
            }
          ]
        }
      ]
    })

    config.plugins.push(
      new EnvironmentPlugin({
        DEVELOPMENT: JSON.stringify(development),
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch()
      }),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: development ? '[name].css' : '[name].[hash].css',
        chunkFilename: development ? '[id].css' : '[id].[hash].css'
      })
    )

    return config
  }
}


