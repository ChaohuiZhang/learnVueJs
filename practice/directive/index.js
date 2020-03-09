import Vue from 'vue'

new Vue({
  el: "#root",
  template: `
  <div>
    <div v-text='"Text:" + text'></div>
    <div v-html='html'></div>
    <div v-show='active'>{{text}}</div>
    <div v-if='active'>{{text}}</div>
    <div v-else-if='text === 0'>else if {{text}}</div>
    <div v-else>else content</div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{item}} : {{index}}</li>
    </ul>
    <ul>
      <li v-for="(val, key, index) in obj">{{val}} : {{key}} : {{index}}</li>
    </ul>
    <div v-on:click="">v-on</div>
    <input v-model.number="text" />
    <input type="checkbox" v-model="active" />
    <div>
      <input type="checkbox" :value="1" v-model="arr" />
      <input type="checkbox" :value="2" v-model="arr" />
      <input type="checkbox" :value="3" v-model="arr" />
      <input type="checkbox" :value="5" v-model="arr" />
      <input type="checkbox" :value="6" v-model="arr" />
    </div>
    <div>
      <input type="radio" value="one" v-model="picked"/>
      <input type="radio" value="two" v-model="picked"/>
    </div>
  </div>
  `,
  data: {
    arr: [1,2,3,4,5],
    obj: {
      a: 123,
      b: 456,
      c: 789
    },
    text: 0,
    active: false,
    html: '<span>this is html</span>',
    picked: ''
  }
})


// vue template:必须是单一节点为根节点
// v-html 将数据作为HTML插入到template中
// value="1" 1 为字符串  :value="1" 1为数字
// v-model.number 修饰符/过滤器   .trim 去掉首尾空格    .lazy oninput -> onchange 事件触发
// v-pre ：写什么显示什么，不会进行compile
// v-cloak 在vue代码没有加载完成之前会存在，加载完成之后，会去掉，不会用到了
// v-once 数据绑定的内容只执行一次，静态内容渲染会使用，节省性能开销


