const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const sassPlugin = require('sass');
// const svgToMiniDataURI = require('mini-svg-data-uri');

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) => (isDev ? `[name].${ext}` : `[name]-[hash].${ext}`);
const copyAssetsPath = (copyPath) => ({
  from: `pug/**/assets/${copyPath}/*`,
  to: `assets/${copyPath}/[name][ext]`,
});

const pug = {
  test: /\.pug$/,
  loader: 'pug3-loader',
};

const babel = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

const sass = {
  test: /\.(s[ac]ss|css)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        // Prefer `dart-sass`
        implementation: sassPlugin,
      },
    },
  ],
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: '/index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    port: 5100,
    hot: isDev,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
      },
      pug,
      { test: /\.svg/, type: 'asset/resource' },
      sass,
      babel,
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  devtool: isDev ? 'source-map' : 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '/pug/index.pug',
    }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/images/',
          to: 'assets/images/',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
