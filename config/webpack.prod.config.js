/*  eslint-disable  */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AssetsPlugin = require('assets-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack-plugin');

module.exports = {
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].[hash].js',
  },
  stats: {
    chunks: false,
    reasons: true,
    colors: true,
    timings: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /src/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: /src/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            'less-loader',
          ],
          fallback: 'style-loader',
          publicPath: '../'
        })
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ExtractTextPlugin('./css/[name].css'),
    //  should comes AFTER extracting css
    new PurifyCssPlugin({
      basePath: __dirname,
      paths: [
        './index.html'
      ]
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),
    new BundleAnalyzerPlugin()
  ]
};