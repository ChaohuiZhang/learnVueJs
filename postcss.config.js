// postcss是 用于后处理css的，优化css代码
// 需要加浏览器前缀的 自动处理
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}