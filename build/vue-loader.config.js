const docsLoader = require.resolve('./doc-loader') // webpack 加载loader的方式是字符串的方式

module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // 写.vue文件时，templete 中，不小心写了空格，导致错误，自动去空格
    extractCSS: !isDev, // 将vue中的css打包到css文件中。 开发环境不需要，会报错
                      // 使用 vue-style-loader进行样式热加载
    // cssModules: {// ！！有问题，暂不启用，后期研究
    //   localIdentName: isDev ? "[path]-[name]-[hash:base64:5]" : "[hash:base64:5]",  // 将css对应的className编译成 文件路径-文件名-hash
    //   camelCase: true     // 将className中用横杠命名的方式，转换成camelCase命名的方式，避免横杠无法作为变量使用；
    //                       // 如何使用？在vue中的style标签中增加module
    // },
    // postcss   // 一般不会写到配置项里面，外面会声明这个，可以直接读取，是一个全局的配置
    // hotReload: false      // 热重载，根据传入的process.env.NODE_ENV === "production" 来判断，production下会关闭
                  // 设置为false的话，表示关闭热重载，此时是刷新整个页面去更新内容，而不是刷新组件(vue components)更新。
                  // 因此默认情况下不会设置
    loaders: {    // 自定义模块  编写组件库时，输出一些文档，放到doc-loader里面
      'docs': docsLoader, //  注释组件
      // js: 'coffe-loader'   // 指定对于的解析loader
    },
    preLoader: {  // 预解析loader，比如typeScript，解析完typescript后，再进行js的loader

    },
    postLoader: { //  后解析loader

    }
  }
}