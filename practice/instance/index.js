import Vue from 'vue'

const div = document.createElement("div")
document.body.appendChild(div)


const app = new Vue ({
  // el: "#root",
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  },
  watch: {  //   写在这里的好处：自动注销
    text (newText, oldText) {
      console.log(newText)
      console.log(oldText)
    }
  },
  // mounted () {
  //   this === app
  // }
})

app.$mount("#root")

setInterval(() => {
  app.text += 1;
  // app.$options.data.text += 1  // 没有效果，vue已经进行过其他操作了
  // app.$data.text += 1    // 有效果
}, 1000)


// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)//穿进去的和基本的属性，所有属性

// app.$options.render = (h) => {  // 重写render方法。第二次渲染会生效
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)  // 根节点，整个应用当中都可以调用


// console.log(app.$children) // 子节点

// 插槽概念，在template中可以书写调用，也可以编译成一个对象，挂到vue实例上面，代码中可以调用
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 模板的一个引用，通过属性，获取HTML的节点，
// 帮我们快速定位到模板中的某个节点或者某个组件，
// 如果是HTML节点，则返回HTML对象；如果是组件，则返回组件实例，vue实例，可以修改属性
// console.log(app.$refs)

// 服务器端渲染可以用到，判断是否为服务器端渲染
// console.log(app.$isServer)

// 监听
// 坏处：需要手动注销
// const unwatch = app.$watch('text', (newText, oldText) => {
//   console.log(newText)
//   console.log(oldText)
// })
// 注销
// unwatch()

// 监听事件
// 注意：触发事件和监听事件，都必须在同一个vue对象上面，才能监听到。不会冒泡
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

// 只触发一次
// app.$once('test', (a, b) => {
  //   console.log(`test emited ${a} ${b}`)
  // })

// 触发事件
// 注意：触发事件和监听事件，都必须在同一个vue对象上面，才能监听到。不会冒泡
// app.$emit('test', 1, 2)

// 强制组件渲染一次，不建议使用，赋值声明时，使用默认值解决
// vue是一个响应式的框架，如果变量属性，没有在data中声明，那么这个值，不会响应，不会自动渲染。
// app.$forceUpdate()

// 如果出现未声明的情况，使用$set进行补充声明
// app.$set(app.obj, 'a', 1)
// 反之删除数据属性
// app.$delete()

// vue渲染过程是异步的，使用异步的队列，一次性将数据值，渲染到页面上面。
// 有时候想要操作dom时，调用此方法，表示等待dom节点更新后，进行一些操作。
// 在vue下一次dom渲染更新的时候，才会运行callback方法
// 经常调试
// app.$nextTick(() => {})
