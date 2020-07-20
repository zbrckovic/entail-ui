const path = require('path')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

const gitRevisionPlugin = new GitRevisionPlugin()

const STORYBOOK_DIR = __dirname
const SRC_DIR = path.resolve(__dirname, '../src')
const NODE_MODULES_DIR = path.resolve(__dirname, '../node_modules')

// noinspection JSUnusedGlobalSymbols
module.exports = {
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register'
  ],
  webpackFinal: async (config, { configType }) => {
    const development = configType === 'DEVELOPMENT'

    const cssModulesOptions = {
      mode: 'local',
      localIdentName: development
        ? '[path][name]_[local][hash:base64:5]'
        : '[hash:base64]'
    }

    config.resolve.modules = [STORYBOOK_DIR, NODE_MODULES_DIR, SRC_DIR]

    config.module.rules.push(
      {
        test: /\.module\.scss$/,
        use: [
          development ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: cssModulesOptions,
              sourceMap: development
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: development
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          development ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: development }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: development }
          }
        ],
        exclude: /\.module\.scss$/
      }
    )

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
