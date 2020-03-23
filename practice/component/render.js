import Vue from 'vue'

const component = {
  name: "comp",
  props: ['prop1'],
  // template: `
  // <div :style="style">
  //   <slot ></slot>
  // </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style,
      // on: {
      //   click: () => { this.$emit('click') }
      // }
    }, [
      this.$slots.header,
      this.prop1
    ])
  },
  data() {
    return {
      style: { // vue 中的样式不支持数字
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  name: "rooter",
  el: "#root",
  components: {
    Comp: component
  },
  data: {
    text: 23333
  },
  mounted() {

  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  // <div>
  //   <Comp ref="comp">
  //     <span ref="span">{{text}}</span>
  //   </Comp>
  // </div>
  // `,
  render(createElement) {
    // return this.$createElement()
    return createElement(
      'Comp',
      {
        ref: 'comp',
        props: {
          prop1: this.text
        },
        // on: {
        //   click: this.handleClick
        // }
        nativeOn: {// 自定绑定到组件的根节点原生dom上面
          click: this.handleClick
        }
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            // domProps: { // 直接操作原生dom
            //   innerHTML: '<span>1111</span>'
            // }
            attrs: {
              id: 'test-id'
            }
          },
          this.text)
      ])
  }
})


// createElement 方法：名称，属性，内容
