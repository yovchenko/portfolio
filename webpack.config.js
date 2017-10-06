const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = { 
    source: path.join(__dirname,'source'),
    build: path.join(__dirname,'build')
};

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 8080,
      },
    entry: PATHS.source + '/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [   
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: { name: '[path][name].[ext]?[hash]'}  
                  }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader','sass-loader' ]
                })
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ]
            }
        
            //...
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery",
            validation: "jquery-validation/dist/jquery.validation",
            amplitude: "amplitudejs/dist/amplitude"
        }
    },
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      include: /\.min\.js$/,
	      minimize: true
        }),
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.html',
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
              return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
};