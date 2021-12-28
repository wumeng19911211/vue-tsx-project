
import Vue from 'vue'
import Component from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld';
@Component({
  components: {
    HelloWorld
  },
})
export default class About extends Vue {
  private render() {
    return  <div class="about">
      <HelloWorld msg="嘿嘿嘿"/>
    </div>
  }
}