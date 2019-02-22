import path from 'path'

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
          cacheDirectory: false,
        },
      }],
    }],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: false,
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
}
