const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const fileEnv = require('dotenv').config({ path: path.resolve(__dirname, '.env') }).parsed

const SRC_DIR = path.resolve(__dirname, './src')
const NODE_MODULES_DIR = path.resolve(__dirname, './node_modules')

module.exports = (options = {}) => {
  const {
    DEVELOPMENT = false,
    API_URL = 'http://localhost:5000',
    API_DELAY = 0,
    API_CLIENT_TIMEOUT_MS = 5000,
    PORT = 8080,
    LOCALE = 'hr',
    API_TOKEN_REFRESH_PERIOD_MINUTES = 5
  } = Object.assign({}, fileEnv, options)

  return {
    mode: DEVELOPMENT ? 'development' : 'production',
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
      port: PORT,
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
        },
        {
          include: SRC_DIR,
          test: /\.css$/,
          use: [
            DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: DEVELOPMENT,
                importLoaders: 1,
                namedExport: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new EnvironmentPlugin({
        DEVELOPMENT,
        API_URL,
        API_DELAY,
        API_CLIENT_TIMEOUT_MS,
        LOCALE,
        API_TOKEN_REFRESH_PERIOD_MINUTES,
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch()
      }),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new FaviconsWebpackPlugin('./resources/favicon.png'),
      new MiniCssExtractPlugin({
        filename: DEVELOPMENT ? '[name].css' : '[name].[hash].css',
        chunkFilename: DEVELOPMENT ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
