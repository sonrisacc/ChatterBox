const path = require('path');
const webpack = require('webpack');
const HEROKU_URL = require('./config');

console.log('webpack config', HEROKU_URL);
const config = {
  context: __dirname,
  entry: './src/index.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 3001
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  // augmenting abilities of webpack
  // will send down module name for debugging purposes
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': { HEROKU_URL }
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/index.jsx';
  config.devtool = false;
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': { HEROKU_URL }
    })
  ];
}

module.exports = config;
