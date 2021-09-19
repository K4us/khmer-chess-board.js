const path = require('path');

const ROOT = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'khmer-chess-board': './src/index.umd.js'
    },

    output: {
        path: ROOT,
        filename: '[name].bundle.js',
        libraryTarget: 'umd'
    },

    mode: 'production',
    devtool: 'source-map',

    resolve: {
        extensions: ['.js'],
    },

    module: {
        rules: [
            /****************
            * LOADERS
            *****************/
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

