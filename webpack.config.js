const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devServer: {
    inline: false,
    watchContentBase: true,
    writeToDisk: (filePath) => {
      return !/hot-update/.test(filePath);
    }
  },
  entry: {
    'sender': './sender/index.js',
    'receiver': './receiver/index.js',
    'code-to-cast': './src/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist/')
  },
  devtool: 'inline-cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'sender/index.html',
      filename: 'sender.html',
      inject: 'body',
      excludeChunks: [
        'code-to-cast',
        'receiver'
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'receiver/index.html',
      filename: 'receiver.html',
      inject: 'body',
      excludeChunks: [
        'code-to-cast',
        'sender'
      ]
    })
  ]
}
