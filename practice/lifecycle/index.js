import Vue from 'vue'

const app = new Vue({
  el: '#root', // 不绑定root，会影响mount，挂载的意思
  // template: '<div>{{text}}</div>',
  // .vue 文件不会有template，他是通过vue-loader统一编译成一个render function，放到解析过的文件中，效率更高
  data: {
    text: 0
  },
  // 整个组件只会被调用一次
  // 服务器端渲染会被调用
  // 不要修改数据，因为reactivity还没有初始化完成
  beforeCreate () {
    console.log(this, 'beforeCreate')
    console.log(this.$el, 'beforeCreate')// undefined
  },
  // 数据有关的操作
  // 整个组件只会被调用一次
  // 服务器端渲染会被调用
  created () {
    console.log(this, 'created')
    console.log(this.$el, 'created')// undefined
  },
  //整个组件只会被调用一次
  // 服务端渲染不会被调用
  beforeMount () {
    console.log(this, 'beforeMount')
    console.log(this.$el, 'beforeMount')//root
  },
  // dom有关的操作
  // 数据有关的操作
  // 整个组件只会被调用一次
  // 服务端渲染不会被调用
  mounted () {
    console.log(this, 'mounted')
    console.log(this.$el, 'mounted')// 渲染替换以后的div
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // 跟 keep alive 组件 有关系
  activated () {
    console.log(this, 'activated')
  },
  // 跟 keep alive 组件 有关系
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    // throw new TypeError('new render error')
    console.log('render fn invoked')
    return h('div', {}, this.text) // dom名称，属性和数据和方法等，内容
  },
  // 开发时会调用，打包时不会调用，调试错误
  // 本组件出现render错误才会被捕获，子组件出现的错误不会被捕获
  renderError(h, err) {
    return h('div', {}, err.stack)
  },
  // 可以用在开发环境，收集运行错误
  // 在根组件中注册，子组件中也会捕获（除非子组件将向上冒泡的事件阻止掉了）
  errorCaptured () {

  }
})

// mount
// app.$mount("#root")

// update
// setInterval(() => {
//   app.text += 1 // 影响到 beforeUpdate  updated
// }, 1000)

// destroy
// setTimeout(() => {
//   app.$destroy() // 主动销毁组件，一般不用，解除事件监听和watch
// }, 1000)

