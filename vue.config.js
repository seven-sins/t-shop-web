const path = require('path');
const { config } = require('process');

module.exports = {
    // 基础路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader是否在保存时检查
    lintOnSave: false,
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: '',
    chainWebpack: () => {},
    configureWebpack: () => {
        config.resolve = {
            // 自动添加文件名后缀
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './public'),
                'data': path.resolve(__dirname, './src/data')
            }
        }
    },
    // 是否为生产环境构建生成 source map？
    productionSourceMap: true,
    // css相关配置
    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: false,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {
            // sass: {
            //     data: `@import "@/src/styles/common.scss";`
            // }
        },

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        requireModuleExtension: true
    },
    // pwa插件
    pwa: {},
    // dev-server
    devServer: {
        port: 8888,
        hot: true,
        proxy: {
            '/rest': {
                target: 'http://127.0.0.1:9001',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/rest': '/rest'
                }
            }
        },
    }
}