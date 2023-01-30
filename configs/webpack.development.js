module.exports = (env) => ({
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 1998
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
});
