const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack')


const port = 2233;
const dist = path.join(__dirname, "dist");
const src = path.join(__dirname, "src");
const host = "localhost";

module.exports = (_, args) => ({
  devtool: "source-map",
  context: src,
  devServer: {
    open: true,
    port,
    hot: true,
    historyApiFallback: true,
    host,
  },
  resolve: {
    modules: [src, "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      src,
    },
  },

  entry: "./index.tsx",
  output: {
    path: dist,
    publicPath:
      args.mode === "development"
        ? `http://${host}:${port}/`
        : undefined /* <- прописать данные своего github */,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css/,
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[name]_[local]-[hash:base64:5]',
      //         },
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.svg",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, "tsconfig.json"),
      },
    }),
  ],
});

// const path = require("path");

// const port = 2233;
// const dist = path.join(__dirname, 'dist');
// const src = path.join(__dirname, 'src');
// const host = 'localhost';

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = (_, args) => {
//   return {
//     context: src,
//     entry: './index.tsx',
//     devtool: "source-map",
//     devServer: {
//             open: true,
//             port,
//             hot: true,
//             historyApiFallback: true,
//             host,
//           },
//     resolve: {
//       extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
//     },
//     output: {
//             path: dist,
//             publicPath:
//               args.mode === 'development' ? `http://${host}:${port}/` : undefined /* <- прописать данные своего github */,
//             filename: `js/[name].js`,
//             chunkFilename: `js/[name].js`,
//           },
//     module: {
//       rules: [
//         {
//           test: /\.(js|ts)x?$/,
//           loader: require.resolve("babel-loader"),
//           exclude: /node_modules/,
//         },
//         {
//           test: /\.svg/,
//           type: 'asset/inline',
//         },
//         {
//           test: /\.s[ac]ss$/i,
//           use: [
//             // MiniCssExtractPlugin.loader,
//             "style-loader",
//             {
//               loader: "css-loader",
//               options: {
//                 modules: {
//                   localIdentName: '[name]_[local]-[hash:base64:5]',
//                 },
//               },
//             },
//             {
//               loader: "sass-loader",

//             }

//           ],
//         },
//         {
//           test: /\.css$/i,
//           use: [
//             // MiniCssExtractPlugin.loader, // использовать вместо style-loader
//             "style-loader",
//             "css-loader"
//           ],
//           exclude: /\.module\.css$/,
//         },
//         {
//           test: /\.module\.css$/i,
//           use: [
//             // MiniCssExtractPlugin.loader, // использовать вместо style-loader
//             "style-loader",
//             {
//               loader: "css-loader",
//               options: {
//                 modules: {
//                   localIdentName: '[name]_[local]-[hash:base64:5]',
//                 },
//               },
//             }
//           ],
//         },
//       ],
//     },
//     plugins: [
//             new HtmlWebpackPlugin({
//               template: './index.html',
//               favicon: './favicon.svg',
//             }),
//             new CleanWebpackPlugin(),
//             new MiniCssExtractPlugin({
//               filename: 'css/[name].css',
//               chunkFilename: 'css/[name].css',
//             }),
//             new ForkTsCheckerWebpackPlugin({
//               typescript: {
//                 configFile: path.join(__dirname, 'tsconfig.json'),
//               },
//             }),
//           ],
//   }
// };
