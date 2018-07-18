var path = require("path");

module.exports = {
    entry: {
        app: "./js/asteroid-data.js",
    },
    output: {
        path: path.resolve(__dirname, "./js/app"),
        filename: "asteroid-data.js" // [name] will keep the file name dynamic
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}