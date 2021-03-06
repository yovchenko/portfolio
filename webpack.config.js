const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    docs: path.join(__dirname, 'docs')
};

module.exports = {
    devServer: {
        historyApiFallback: true,
        inline: true,
        progress: true,
        contentBase: PATHS.docs,
        port: 8081
    },
    devtool: 'source-map',
    entry: ['babel-polyfill', PATHS.source + '/index.js'],
    output: {
        path: PATHS.docs,
        publicPath: '',
        filename: "[name].js"
    },
    module: {
        rules: [ {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
             },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true 
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [require('autoprefixer')({
                                    browsers: ['last 2 versions']
                                })]
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|)$/,
                exclude: [/images/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]&[hash]',
                        outputPath: '/fonts/',
                        publicPath: '..'
                    }
                }, ]
            },
            {
                test: /\.(png|jpg?g|gif|svg|)$/i,
                exclude: [/fonts/],
                use: [

                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/images/',
                            publicPath: '..'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: process.env.NODE_ENV === 'production',
                            gifsicle: {
                                interlaced: false,
                                optimizationLevel: 3
                            },
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: true,
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [{
                                        removeTitle: true
                                    },
                                    {
                                        convertPathData: false
                                    },
                                    {
                                        removeComments: true
                                    },
                                    {
                                        removeMetadata: true
                                    },
                                    {
                                        removeTitle: true
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src'],
                            minimize: true
                        }
                    },

                ]
            }
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery",
            modernizr$: path.resolve(__dirname, "/path/to/empty-alias-file.js"),
            validation: "jquery-validation/dist/jquery.validation",
            amplitude: "amplitudejs/dist/amplitude",
            normalize: "node-normalize-scss/_normalize.scss",
            device: "current-device/umd/current-device",
            bodymovin: "bodymovin/build/player/bodymovin"
        },
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: PATHS.source + '/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new FaviconsWebpackPlugin(PATHS.source + '/favicon/favicon.png'),
        new ManifestPlugin(),
        new UglifyJsPlugin(),
        new OfflinePlugin(),
        new ExtractTextPlugin("css/main.css"),
        new ServiceWorkerWebpackPlugin({
            entry: PATHS.source + '/sw-config.json',
          })
    ]
};