var path = require('path')
module.exports = {
    entry:  './index.ts',
    output: {
        path:     'builds',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test:   /\.ts/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'cheap-source-map'
};
