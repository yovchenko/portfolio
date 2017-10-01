const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
       'main' : './js/main.js',
       'background' : './js/canvasBackground.js',
       'sphere' : './js/canvasSphere.js',
       'form' : './js/contactForm.js',
       'preload' : './js/preloader.js',
       'resize' : './js/resize.js',
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  'style-loader', 
                  'css-loader',
                  'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery",
            validation: "jquery-validation/dist/jquery.validation"
        }
    },
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      include: /\.min\.js$/,
	      minimize: true
        }),
	]
};