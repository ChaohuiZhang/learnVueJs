import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: {
      type: String,
      // required: true
    }
  },
  template: `
  <div>
    <input type="text" v-model="text" />
    <span>{{propOne}}</span>
    <span v-show="active">see me if active</span>
  </div>
  `,
  mounted() {
    console.log("comp mounted")
  },
  data() {
    return {
      text: 123
    }
  }
}

// 扩展vue
// const CompVue = Vue.extend(component) // 是vue的子类

// new CompVue ({
//   el: "#root",
//   propsData: {  //  传数据进来
//     propOne: "xxx"
//   },
//   data: { //  覆盖默认值，跟上面的数据合并
//     text: 333
//   },
//   mounted() {
//     console.log('instand mounted')
//   }
// })

// 使用extends 进行继承
const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted() {
    console.log('component2 mounted')
    console.log(this.$parent.$options.name)
    // this.$parent.text = "12345" // 不建议修改父组件中的内容
  }
}
const parent = new Vue({
  name: 'parent'
})

new Vue({
  parent: parent, // 只有new vue时，才能指定parent
  name: "rooter",
  el: "#root",
  components: {
    Comp: component2
  },
  data: {
    text: 23333
  },
  mounted() {
    console.log('instance mounted')
    console.log(this.$parent.$options.name)
    // this.$parent.text = "12345" // 不建议修改父组件中的内容
  },
  template: `
  <div>
    <span>{{text}}</span>
    <Comp></Comp>
  </div>
  `
})
