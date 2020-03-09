import Vue from 'vue'

// data需要使用function 定义，return 一个数据结构，且不能使用一个全局的变量来return。
// 原因：假如要重复使用相同的两个组件，那么两个组件内使用的是同一份数据，两个组件数据互相污染。
const component = {
  // props 是从父组件中传进来的数据属性，因此尽量不要去主动修改这个值，尽量使用事件触发的形式，让父组件进行修改
  props: {// 定位组件在外部被使用时的一些可变 可配置的行为
    active: Boolean, // vue自动验证输入的值是否为bool，不是的话会报warning
    propOne: String,
    onChange: Function,
    active2: {
      // type: Boolean,
      required: true,
      // default: false,
      default() {  // 返回一个方法
        return {}
      },
      validator (value) { // 自定义验证
        return typeof value === 'boolean'
      }
    }
  },
  // props:['active', 'propOne]
  template: `
  <div>
    <input type="text" v-model="text" />
    <span @click="handleChange2">{{propOne}}</span>
    <span v-show="active">see me if active</span>
  </div>
  `,
  mounted() {

  },
  data() {
    return {
      text: 123
    }
  },
  methods: {
    // 更简单的方法：使用$emit，推荐使用$emit
    handleChange2() {
      this.onChange();
    }
  }
}

// 定义到全局组件使用
// 定义组件时，需要使用首字母大写,驼峰法
// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  data: {
    propOne: 'text1'
  },
  methods: {
    handleChange() {
      this.propOne += 1;
    }
  },
  mounted() {
    console.log(this.$refs.comp1) // 获取组件实例
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="propOne" :on-change="handleChange"></comp-one>
      <comp-one :active="false"></comp-one>
    </div>
  `// 调用使用连字符
})
