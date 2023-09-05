const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", //or production
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    port: 5001,
    open: true,
    hot: true,
  },
  //loaders
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(svg|ico|png|webp|jpg|jpeg|gif)$/, type: "asset/resource" },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Demo",
      filename: "index.html",
      template: path.resolve(__dirname, "src/temp.html"),
    }),
  ],
};
