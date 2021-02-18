const path = require('path');

const ROOT = path.resolve(__dirname, 'src');

module.exports = {
    context: ROOT,

    entry: {
        'khmer-chess-board': './KhmerChessboard.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'umd'
    },

    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        open: true,
        port: 8081
    },

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
            * PRE-LOADERS
            *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?|mp3)(\?[a-z0-9=&.]+)?$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
};

