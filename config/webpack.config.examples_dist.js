const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const PUBLIC_PATH = '/react-video-cover';

const CONFIG_EXAMPLE_DIST = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  entry: [
    paths.examplesIndexJs,
  ],
  module: {
    noParse: [
      /\/sinon\.js/,
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [paths.examplesSrc, paths.componentSrc],
        query: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  output: {
    path: paths.examplesDist,
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      CONFIG: {
        basePath: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.examplesHtml,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = CONFIG_EXAMPLE_DIST;
