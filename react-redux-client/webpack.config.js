'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    plugins: [
        // Required for `ms-signalr-client`...
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API_ENDPOINT: JSON.stringify('http://tradingtileserver.azurewebsites.net')
            }
        })
    ]
}
