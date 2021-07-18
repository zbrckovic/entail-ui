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
    ENTAIL_DEVELOPMENT = false,
    ENTAIL_PORT = 8080,
    ENTAIL_LOCALE = 'hr'
  } = Object.assign({}, fileEnv, options)

  return {
    mode: ENTAIL_DEVELOPMENT ? 'development' : 'production',
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
      port: ENTAIL_PORT,
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
                ENTAIL_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      mode: 'local',
                      localIdentName: ENTAIL_DEVELOPMENT
                        ? '[path][name]_[local][hash:base64:5]'
                        : '[hash:base64]'
                    },
                    sourceMap: ENTAIL_DEVELOPMENT
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: ENTAIL_DEVELOPMENT }
                }
              ]
            },
            {
              use: [
                ENTAIL_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: ENTAIL_DEVELOPMENT
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: ENTAIL_DEVELOPMENT }
                }
              ]
            }
          ]
        },
        {
          include: SRC_DIR,
          test: /\.css$/,
          use: [
            ENTAIL_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: ENTAIL_DEVELOPMENT,
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
        DEVELOPMENT: ENTAIL_DEVELOPMENT,
        LOCALE: ENTAIL_LOCALE,
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
        filename: ENTAIL_DEVELOPMENT ? '[name].css' : '[name].[hash].css',
        chunkFilename: ENTAIL_DEVELOPMENT ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
