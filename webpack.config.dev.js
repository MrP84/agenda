import webpack from 'webpack'

module.exports = {
  mode: 'development',
  entry: `./${process.env.SRC}/${process.env.SRC_SCRIPTS_ENTRY}`,
  output: {
    filename: process.env.DEST_OUTPUT_SCRIPT_NAME
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['css-loader']
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'app.js.map',
      exclude: ['vendor.js']
    })
  ]
}
