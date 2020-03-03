import Vue from 'vue'

new Vue({
  el: "#root",
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>fullName: {{fullName}}</p>
      <p><input type='text' v-model='number' /></p>
      <p>firstName: <input type='text' v-model='firstName' /></p>
      <p>lastName: <input type='text' v-model='lastName' /></p>
      <p>Name: <input type='text' v-model='name' /></p>
    </div>

  `,
  data: {
    firstName: 'chaohui',
    lastName: 'zhang',
    number: 0,
    fullName: ''
  },
  // !!! 不要在computed中不要修改data的值
  // !!! 不要在watch中修改监听的值
  computed: {
    // 不依赖的值每次变化，不会重新计算，调用函数
    // 依赖的值每次变化，则会重新计算
    name: {
      get () {
        console.log("new Name")
        return `${this.firstName} ${this.lastName}`
      },
      set (name) { // 不推荐
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // 更多的时候，适用于：监听某个值的变化，做一个指定的操作（给服务端发送请求）
    // 默认第一次不执行，如果需要执行，那么增加immediate属性为true
    firstName: {
      handler (newName, oldName) {
        this.firstName = newName + ' ' + this.lastName
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 每次变化会进行重新计算
    getName () {
      console.log("getName invoked")
      return `${this.firstName} ${this.lastName}`
    }
  }
})
