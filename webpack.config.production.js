const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, 'src');

module.exports = {
    context: ROOT,

    entry: {
        'khmer-chess-board': './Index.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'umd'
    },

    mode: 'production',
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts?$/,
                use: 'ts-loader'
            },
            {
                test: /\.(jpe?g|png|ttf|eot|woff(2)?|mp3)(\?[a-z0-9=&.]+)?$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    }
};

