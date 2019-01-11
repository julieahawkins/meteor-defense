const path = require('path');

module.exports = {
    entry: {
        main: "./lib/index.js",
        test: "mocha!./test/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    devtool: 'source-map',
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: [
                        "transform-object-rest-spread",
                        "transform-es2015-shorthand-properties",
                        "transform-class-properties"
                    ]
                }
            },
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.(png|svg|jpg|gif|wav)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    }
};
