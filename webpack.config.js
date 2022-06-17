const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const configMode = (mode) => require(`./configs/webpack.${mode}`);

const baseConfig = ({ analyze, mode }) => ({
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
  ].filter(Boolean),
});

module.exports = (env, args) => merge(baseConfig(args), configMode(args.mode));
