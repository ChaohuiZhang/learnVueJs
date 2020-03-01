const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')// 将非js代码打包成一个静态文件

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        // webpack 全局定义插件，可以定义一个全局的参数，这个参数可以在业务js代码中获取到，比如根据这个参数，编写用于dev和用于生产环境的代码
        // 双引号必须加
        new webpack.DefinePlugin({
            'process.env': isDev ? '"development"' : '"production"'
        }),
        /**
         * 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
         * Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
        */
        new VueLoaderPlugin(),
        // htmlPlugin
        new HTMLPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js[x]$/,
                exclude: /node_modules/,
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
                            name: '[name]-aaa.[ext]' // 指定输出名字
                        }
                    }
                ]
            }
        ]
    }
}

if (isDev) {
    config.module.rules.push(
        {
            test: /\.styl/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader', // css 后处理
                    options: {
                        sourceMap: true // 可以直接使用之前的sorceMap，使编译速度更快
                    }
                },
                'stylus-loader'
            ]
        });
    config.devtool = '#cheap-module-eval-source-map' // 帮助调试代码，source map 代码映射
    config.devServer = {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        host: 'localhost',
        overlay: { // 将错误信息直接输出到浏览器
            errors: true
        },
        hot: true,  //修改了一个组件的代码，只更新当前组件的数据效果，不会导致整个界面都刷新
        open: false // 自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),// 热更新
        new webpack.NoEmitOnErrorsPlugin()// 避免展示一些不必要的信息的插件
    )
} else {
    config.entry = {
        app: path.join(__dirname, "client/index.js")
    }
    // 第三方依赖单独打包
    config.optimization = {
        splitChunks: {
          chunks: "all", 
          minSize: 0,   
          name: 'vendor',      
          minChunks: 1,             
        }
    }
    // 区别
    // hash: 所有打包出来的每个模块都是同一个hash，是整个应用的一个hash
    // chunkhash: chunk：可以理解为在entry中声明的节点，当异步加载模块时，每个异步模块都是chunk，chunkhas就是说每个模块单独生成一个hash 
    config.output.filename = '[name].[chunkhash:8].js'
    // loader 插件处理，都是自下而上的方式
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({// 单独生成一个文件
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        })
    config.plugins.push(
        // 因为webpack 4 包含了contenthash 这个关键字段，所以在extractPlugin 中不能使用contenthash字段
        new ExtractPlugin('styles.[md5:contenthash:hex:8].css'), // 根据内容进行hash，生成一个单独的值
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            name: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor"
        // })
        // 将webpack相关的代码单独打包到一个文件里面，避免后续新增模块时，影响到其他模块的ID，导致浏览器无法缓存
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "runtime"
        // })
    )
}

module.exports = config