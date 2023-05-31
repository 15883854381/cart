const {defineConfig} = require('@vue/cli-service')

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
    chainWebpack: config => {
        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === "production") {
            config.plugin("compressionPlugin").use(
                new CompressionPlugin({
                    algorithm: 'gzip', // 使用gzip压缩
                    test: /\.js$|\.html$|\.css$/, // 匹配文件名
                        filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
                    minRatio: 1, // 压缩率小于1才会压缩
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
                }),
            );
        }
    },
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        allowedHosts: [
            'e.199909.xyz', // 允许访问的域名地址，即花生壳内网穿透的地址
            '.199909.xyz'   // .是二级域名的通配符
        ]
    },
})
