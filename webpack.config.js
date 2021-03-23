const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const config = {
  entry: {
    popup: path.join(__dirname, "src/popup.tsx"),
    content: path.join(__dirname, "src/content.ts"),
    noflash: path.join(__dirname, "src/no-flash.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

module.exports = config;
