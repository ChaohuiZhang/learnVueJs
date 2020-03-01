export default {
  data() {
    return {
      author: 'zch'
    }
  },
  render() {
    return (
      // jsx好处：用js的方式，循环出html，而不用vue的方式for循环渲染
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
