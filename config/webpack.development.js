module.exports = {
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:8080/",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
};
