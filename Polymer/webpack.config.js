const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/rd-app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new UglifyJsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //    name: 'common' // Specify the common bundle's name.
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
      }
      
    ]),
    new HtmlWebpackPlugin({
      //inlineSource: '.(js|css)$', // embed all javascript and css inline
      title:'Tantangan Web Tampil dan Interaktif Dalam 5 Detik',
      filename: 'index.html',
      template: 'src/index.html',
      prefetch:false
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new ResourceHintWebpackPlugin(),
    // new PreloadWebpackPlugin({
    //   include: 'allChunks'
    // })
  ]
};


