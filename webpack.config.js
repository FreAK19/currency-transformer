/*  eslint-disable  */
const merge = require('webpack-merge');
const development = require('./config/webpack.dev.config');
const production = require('./config/webpack.prod.config');
const path = require('path');


const PATH = {
  //  not change name App
  app: path.join(__dirname, './src/index.js'),
  build: path.resolve(__dirname, 'build')
};

const common = {

  context: __dirname,
  target: 'web',
  output: {
    path: PATH.build,
    filename: '[name].bundle.js',
    publicPath: "/public/"
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
    modules: ['node_modules', path.join(__dirname, 'src')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000,
              name: './fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              name: './image/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
};

module.exports = function(env) {
  if (env === 'development') {
    return merge([
      common,
      development,
      {
        entry: {
          app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            PATH.app
          ]
        }
      },
    ]);
  }
  if (env === 'production') {
    return merge([
      {
        entry: {
          app: PATH.app,
          vendor: ["vendor"]
        },
      },
      common,
      production
    ])
  }
};