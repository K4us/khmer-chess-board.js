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
        rules: []
    }
};

