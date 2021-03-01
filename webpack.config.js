module.exports = {
    renderer: {
        entry: './src/renderer/javascripts/index.js',
        module: {
            rules: [{
                test: /\.(gif|png|jpg|jpeg|svg)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            }]
        }
    },
    preload: {
        entry: './src/preload/index.js'
    },
    main: {
        entry: './src/main/index.js'
    }
}