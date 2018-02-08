/*  eslint-disable  */

const webpack = require('webpack');

module.exports = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true
            }
          },
        ]
      },
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};