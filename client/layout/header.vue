<template>
  <header class="main-header">
    <!-- camelCase 编译完以后自动增加一个变量 :class="$style.mainHeader" -->
    <h1>JTodo</h1>
  </header>
</template>

<script>
// export default {
  // className 自动编译过程
  // scoped 能达到同样效果，但是localIdentName 的保密性和可调试性更好
  // computed: {
  //   $style() {
  //     return {
  //       mainHeader: ''
  //     }
  //   }
  // }
// }
</script>

<style lang="stylus" module>
.main-header{
  text-align center
  h1{
    font-size 100px
    color: rgba(175, 47, 47, 0.4)
    font-weight 100
    margin 20px
  }
}
</style>

<docs>
  #123 = 456
</docs>