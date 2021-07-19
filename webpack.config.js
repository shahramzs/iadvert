const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')
const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
        filename: 'index.bundle.js',
        chunkFilename: 'index.bundle.js',
       chunkLoading: 'async-node',
        scriptType: 'text/javascript',
        workerChunkLoading: 'async-node',
        environment: {
          // The environment supports arrow functions ('() => { ... }').
          arrowFunction: true,
          // The environment supports BigInt as literal (123n).
          bigIntLiteral: false,
          // The environment supports const and let for variable declarations.
          const: true,
          // The environment supports destructuring ('{ a, b } = obj').
          destructuring: true,
          // The environment supports an async import() function to import EcmaScript modules.
          dynamicImport: false,
          // The environment supports 'for of' iteration ('for (const x of array) { ... }').
          forOf: true,
          // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
          module: false,
        },
          wasmLoading: 'fetch',
          enabledWasmLoadingTypes: ['fetch'],
          iife: true,
      },
      
      devServer: {
        bonjour: true,
        clientLogLevel: 'silent',
        contentBasePublicPath: './public/manifest.json',
        filename: 'index.bundle.js',
        hot: true,
        hotOnly: true,
        mimeTypes: { 'text/html': ['phtml'] },
        proxy: {
          '/api': 'http://localhost:3000',
        },
        publicPath: '',


       index: 'index.html',
        inline:true,
        port: 3000,
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
        compress: true,
        historyApiFallback: {
          disableDotRule:true,
        },
        watchContentBase: true,
        liveReload: true,
        serveIndex: true,
        staticOptions: {
          redirect: false,
        },
        stats: 'normal',
        watchOptions: {
          poll: true,
        },
        quiet: true,
      },
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
            parallel: true,
          }),
         new CssMinimizerPlugin(),
          new HtmlMinimizerPlugin()
        ]
      },
      module: {
        rules: [
          {test: /\.jsx?$/i, exclude: /node_modules/, use: [{loader:'babel-loader', options: {plugins: ['@babel/plugin-syntax-top-level-await']}}, {loader:'astroturf/loader'}]},
          {test: /\.css$/i,use: ['style-loader', 'css-loader', 'postcss-loader']},
          {test: /\.(png|svg|mp4|mp3|ttf|jpe?g|gif)$/i,use: [{loader: 'file-loader'}]},
          {test: /\.mp3$/, include: SRC,loader: 'file-loader'},
        ],
      },
      plugins: [
        new htmlWebpackPlugin({
          template: path.resolve('./public/index.html'),
        }),
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
      ],
      resolve: {
        extensions: ['.js', '.jsx', '.mp4', '.gif', '.png', '.jpg', '.jpeg', '.svg', '.mp3'],
      },
  };