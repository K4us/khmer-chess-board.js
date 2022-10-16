const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, 'src');

module.exports = {
    context: ROOT,

    entry: {
        'khmer-chess-board': './dev.ts'
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
        open: os.platform() === "win32" ? "C:\\Program Files\\Firefox Developer Edition\\firefox.exe" : "Firefox Developer Edition",
        port: 8081
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    }
};

