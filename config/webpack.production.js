const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: false,
  output: {
    filename: "js/[name].[contenthash:8].chunk.js",
    publicPath: "https://pokedex.shanpriyan.in/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].chunk.css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
