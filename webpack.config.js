const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const gitRevisionPlugin = new GitRevisionPlugin()

const SRC_DIR = path.resolve(__dirname, './src')
const NODE_MODULES_DIR = path.resolve(__dirname, './node_modules')

module.exports = (options = {}) => {
  const development = Boolean(options.development)

  return {
    mode: development ? 'development' : 'production',
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
      hot: true,
      historyApiFallback: true
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
              test: /\.module\.s[ac]ss$/,
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
        },
        {
          include: SRC_DIR,
          test: /\.css$/,
          use: [
            development ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: development,
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
        DEVELOPMENT: JSON.stringify(development),
        VERSION: gitRevisionPlugin.version(),
        COMMIT_HASH: gitRevisionPlugin.commithash(),
        BRANCH: gitRevisionPlugin.branch()
      }),
      new Dotenv(),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new FaviconsWebpackPlugin('./resources/favicon.png'),
      new MiniCssExtractPlugin({
        filename: development ? '[name].css' : '[name].[hash].css',
        chunkFilename: development ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
