const path = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const fileEnv = require('dotenv').config({ path: path.resolve(__dirname, '.env') }).parsed

const STORYBOOK_DIR = __dirname
const SRC_DIR = path.resolve(__dirname, '../src')
const NODE_MODULES_DIR = path.resolve(__dirname, '../node_modules')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async config => {
    const {
      DEVELOPMENT = true,
      LOCALE = 'hr'
    } = Object.assign({}, fileEnv)

    config.resolve.extensions = ['.js', '.jsx']
    config.resolve.modules = [STORYBOOK_DIR, NODE_MODULES_DIR, SRC_DIR]

    config.module.rules.push({
      test: /\.s[ac]ss$/,
      oneOf: [
        {
          test: /\.m\.s[ac]ss$/,
          use: [
            DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: DEVELOPMENT
                    ? '[path][name]_[local][hash:base64:5]'
                    : '[hash:base64]'
                },
                sourceMap: DEVELOPMENT
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: DEVELOPMENT }
            }
          ]
        },
        {
          use: [
            DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: DEVELOPMENT
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: DEVELOPMENT }
            }
          ]
        }
      ]
    })

    config.plugins.push(
      new EnvironmentPlugin({
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch(),
        DEVELOPMENT,
        LOCALE
      }),
      new MiniCssExtractPlugin({
        filename: DEVELOPMENT ? '[name].css' : '[name].[hash].css',
        chunkFilename: DEVELOPMENT ? '[id].css' : '[id].[hash].css'
      })
    )

    return config
  }
}


