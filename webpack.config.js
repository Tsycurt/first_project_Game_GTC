const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/typeScript/index.ts",
    gaming: "./src/typeScript/gaming.ts",
    scoreboard: "./src/typeScript/scoreboard.ts"
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Guess The Celebrity",
      template: "src/index.html",
      filename: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      title: "Guess The Celebrity",
      template: "src/gaming.html",
      filename: "gaming.html",
      chunks: ["gaming"]
    }),
    new HtmlWebpackPlugin({
        title: "Guess The Celebrity",
        template: "src/scoreboard.html",
        filename: "scoreboard.html",
        chunks: ["scoreboard"]
      }),
  ],
};
