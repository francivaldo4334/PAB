const path = require('path');

module.exports = {
    entry: './src/script.ts',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production',
    // mode: "development",
};
