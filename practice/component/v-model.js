import Vue from 'vue'
// 组件里面实现v-model 实现vue的双向绑定
const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: {
    value: Number,
    value1: String
  },
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1"/>
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: "#root",
  template: `
    <div>
      <comp-one :value="value" @input="value = arguments[0]"></comp-one>
    </div>
  `,
  data(){
    return {
      value: 123
    }
  }
})
