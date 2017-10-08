const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const PATHS = { 
    source: path.join(__dirname,'source'),
    docs: path.join(__dirname,'docs')
};

module.exports = {
    devServer: {
        historyApiFallback: true,
        inline: true,
        progress: true,
        contentBase: PATHS.docs,
        port: 8080,
      },
    entry: PATHS.source + '/index.js',
    output: {
        path: PATHS.docs,
        publicPath: '',
        filename: "[name].js",
      
    },
    module: {
        rules: [   
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: '/fonts/',
                        }  
                    },
                ]
            },
            {
            test: /\.(png|jpg&g|gif|svg|)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: '/images/',
                    }  
                },
                 'img-loader'
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
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
              }
        }),
    /*   new FaviconsWebpackPlugin(PATHS.source + '/favicon/favicon.png'), */
        new ExtractTextPlugin({
            filename:  (getPath) => {
              return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
};