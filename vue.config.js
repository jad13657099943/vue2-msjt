module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                       // selectorBlackList: ['weui', 'mu'],
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 80, // 端口号
        https: false,
        open: false, //配置自动启动浏览器

        // 配置多个代理
        proxy: {
            '/api': {
                target: 'https://msjt.jxsxkeji.com/', // 代理服务器路径
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '', // 去掉接口地址中的api字符串
                },
            },
        },
    },
    publicPath:process.env.NODE_ENV === 'production' ? './' : './'
}