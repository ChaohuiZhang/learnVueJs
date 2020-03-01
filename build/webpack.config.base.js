// 把所有的webpack配置都要用到的放到这个模块中

// 分类规则：base里面放 需要在服务器端渲染的内容，多余的不需要。

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const createVueloaderConfig = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            // {
            //     test: /\.(vue|js|jsx)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/,
            //     enforce: 'pre'  // 预处理，在正式编译loader时，之前要进行eslint-loader进行检测一下。如果不通过，不执行下一个loader
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueloaderConfig(isDev)
            },
            {
                test: /\.js[x]$/,
                exclude: /node_modules/, // !
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',//把图片转换为base64代码，直接写到HTML文件里面，不用生成新的文件，减少HTTP请求
                                            // url-loader 封装了一下file-loader，
                        options: { // 传一些参数给loader，指定处理方式
                            limit: 1024, // 
                            name: 'resources/[path][name]-[hash:8].[ext]' // 指定输出名字和路径   []表示是一个变量
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
      /**
       * 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
       * Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
      */
     new VueLoaderPlugin()
    ]
}

module.exports = config