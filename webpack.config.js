const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const { EnvironmentPlugin, ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const fileEnv = require('dotenv').config({ path: path.resolve(__dirname, '.env') }).parsed

const SRC_DIR = path.resolve(__dirname, './src')
const NODE_MODULES_DIR = path.resolve(__dirname, './node_modules')

module.exports = (options = {}) => {
  const {
    ENTAIL_FRONTEND_DEVELOPMENT = false,
    ENTAIL_FRONTEND_API_URL = 'http://localhost:5000',
    ENTAIL_FRONTEND_API_DELAY = 0,
    ENTAIL_FRONTEND_API_CLIENT_TIMEOUT_MS = 5000,
    ENTAIL_FRONTEND_PORT = 8080,
    ENTAIL_FRONTEND_LOCALE = 'hr',
    ENTAIL_FRONTEND_API_TOKEN_REFRESH_PERIOD_MINUTES = 5
  } = Object.assign({}, fileEnv, options)

  return {
    mode: ENTAIL_FRONTEND_DEVELOPMENT ? 'development' : 'production',
    entry: './src/index.jsx',
    devtool: 'source-map',
    output: {
      publicPath: '/',
      filename: 'main.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [NODE_MODULES_DIR, SRC_DIR]
    },
    devServer: {
      contentBase: SRC_DIR,
      port: ENTAIL_FRONTEND_PORT,
      hot: true,
      historyApiFallback: {
        disableDotRule: true
      },
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.html?$/,
          use: 'html-loader'
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/,
          oneOf: [
            {
              test: /\.m\.s[ac]ss$/,
              use: [
                ENTAIL_FRONTEND_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      mode: 'local',
                      localIdentName: ENTAIL_FRONTEND_DEVELOPMENT
                        ? '[path][name]_[local][hash:base64:5]'
                        : '[hash:base64]'
                    },
                    sourceMap: ENTAIL_FRONTEND_DEVELOPMENT
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: ENTAIL_FRONTEND_DEVELOPMENT }
                }
              ]
            },
            {
              use: [
                ENTAIL_FRONTEND_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: ENTAIL_FRONTEND_DEVELOPMENT
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: ENTAIL_FRONTEND_DEVELOPMENT }
                }
              ]
            }
          ]
        },
        {
          include: SRC_DIR,
          test: /\.css$/,
          use: [
            ENTAIL_FRONTEND_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: ENTAIL_FRONTEND_DEVELOPMENT,
                importLoaders: 1,
                namedExport: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ProvidePlugin({ process: 'process/browser' }),
      new EnvironmentPlugin({
        DEVELOPMENT: ENTAIL_FRONTEND_DEVELOPMENT,
        API_URL: ENTAIL_FRONTEND_API_URL,
        API_DELAY: ENTAIL_FRONTEND_API_DELAY,
        API_CLIENT_TIMEOUT_MS: ENTAIL_FRONTEND_API_CLIENT_TIMEOUT_MS,
        LOCALE: ENTAIL_FRONTEND_LOCALE,
        API_TOKEN_REFRESH_PERIOD_MINUTES: ENTAIL_FRONTEND_API_TOKEN_REFRESH_PERIOD_MINUTES,
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch()
      }),
      new HtmlWebpackPlugin({
        title: 'Entail',
        template: './src/index.html',
        favicon: 'resources/favicon.png'
      }),
      new MiniCssExtractPlugin({
        filename: ENTAIL_FRONTEND_DEVELOPMENT ? '[name].css' : '[name].[hash].css',
        chunkFilename: ENTAIL_FRONTEND_DEVELOPMENT ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
