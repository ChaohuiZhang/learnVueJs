import Vue from 'vue'
// 插槽的概念 slot
// scoped slot / v-slot作用于插槽
// 父级 provider 子级 inject
// provider 默认不提供reactive属性的，也就是说provider提供出去的值再怎么边，子组件的引用都无法重新渲染

const ChildComponent = {
  template: '<div>child component {{data.value}}</div>',
  inject: ["yeye", "data"],
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye)
    console.log(this.value)
  }
}

const component = {
  name: "comp",
  components: {
    ChildComponent
  },
  // template: `
  // <div :style="style">
  //   <div class="header">
  //     <slot name="header"></slot>
  //   </div>
  //   <div class="body">
  //     <slot name="body"></slot>
  //   </div>
  // </div>
  // `,
  template: `
  <div :style="style">
    <slot name="slotName" :text="111" :aaa="value"></slot>
    <Child-Component/>
  </div>
  `,
  data () {
    return {
      style: { // vue 中的样式不支持数字
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: "test1234"
    }
  }
}

new Vue({
  name: "rooter",
  provide() {
    // 如何将父组件provider出去的值同步渲染到子组件
    const data = {}
    // vue中reactive实现的根本原理：就是使用了defineProperty方法
    Object.defineProperty(data, "value", {
      get: () => this.text,
      enumerable: true
    })
    return {
      yeye: this,
      data // 必须使用属性引用的方式，如果用值的方式，不会成功
    }
  },
  el: "#root",
  components: {
    Comp: component
  },
  data: {
    text: 23333
  },
  mounted() {

  },
  template: `
  <div>
    <Comp>
      <template v-slot:slotName="props">
        <span>{{props.text}} {{props.aaa}}</span>
      </template>
    </Comp>
    <input type="text" v-model="text"/>
  </div>
  `
})
