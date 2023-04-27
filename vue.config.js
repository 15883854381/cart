const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        allowedHosts: [
            'e.199909.xyz', // 允许访问的域名地址，即花生壳内网穿透的地址
            '.199909.xyz'   // .是二级域名的通配符
        ]
    }
})
