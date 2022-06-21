const path = require("path");
const { ProgressPlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");

const configMode = (env) => require(`./configs/webpack.${env.mode}`)(env);

const baseConfig = ({ analyze, mode, compress }) => ({
  mode,
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpeg|jpg|png|gif|webp|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    analyze && new BundleAnalyzerPlugin(),
    new ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: "public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    compress &&
      new CompressionPlugin({
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
      }),
  ].filter(Boolean),
});

module.exports = (env) => merge(baseConfig(env), configMode(env));
