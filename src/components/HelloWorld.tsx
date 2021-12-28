/*
 * @Author: wumeng
 * @Date: 2021-12-22 11:08:38
 * @Description: file content
 */
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    msg: {
      type: String,
      default() {
        return ''
      }
    }
  }
})
export default class HelloWorld extends Vue {
  public age: number = 100
  public sayHi() {
    alert('Hi')
  }
  private created() {
    this.age ++
  }
  private render() {
    return <div class="hello">
      <h3 onClick={ this.sayHi }>{ this.msg }</h3>
      <h3>{ this.age }</h3>
    </div>
  }
}



