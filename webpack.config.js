const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "main.js"
    },
    target: "web",
    devServer: {
        port: '1947',
        static: ['./public'],
        open: false,
        hot: true,
        liveReload: true
    },
    resolve: {
        extensions: ['.ts','.tsx','.js','.jsx','.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
}