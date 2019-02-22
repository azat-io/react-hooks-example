import path from 'path'
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
} from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

export default {
  entry: './app',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'js/main.[hash].js',
    pathinfo: false,
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      title: 'React Hooks Example',
      cache: true,
      inject: true,
      appMountId: 'app',
      mobile: true,
      meta: {
        description: 'Some app',
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/i,
      exclude: [
        '/node_modules/',
        '/public/',
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }],
    }],
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': `http://localhost:${process.env.SERVER_PORT}`,
    },
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}
