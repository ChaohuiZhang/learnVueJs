import Vue from 'vue'

var globalVar = '111'

new Vue({
  el: "#root",
  // template: `
  // <div v-bind:id="aaa" v-on:click="handleClick">
  //   {{html}}
  //   <p v-thml="html"></p>
  // </div>
  // `,
  template: `
  <div
    :class="[{ active: isActive }]"
    :style="[styles, styles2]"
  >
    {{html}}
    <p>{{getJoinedArr(arr)}}</p>
  </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none' // 消除默认样式 // vue会自动加入浏览器前缀，绑定style这个就是优势
    },
    styles2: {
      color: 'blace'
    }
  },
  methods: {
    handleClick () {
      alert("click")
    },
    getJoinedArr(arr) {
      return arr.join(' ')
    }
  },
})

// {{isActive ? 'active' : 'not active'}}
// {{arr.join(' ')}}
// {{Date.now()}}
// {{globalVar}}  undefined

// {{html}} vue 会默认转义字符串
// <p v-thml="html"></p>  通过指令来实现HTML渲染

// v-bind 绑定一些动态数据，简写成:
// v-on  绑定事件，简写成@

// jQuery 事件代理：body上面绑定一个事件，下面的子元素点击都通过body来触发，优化性能

// <div :class="{ active: !isActive }">
// <div :class="[isActive ? 'active' : '']">
// <div :class="[{ active: isActive }]">

// 数据绑定范围：绑定在this上面的值、默认的js全局变量等
