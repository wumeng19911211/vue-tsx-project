import { CreateElement, VNode } from 'vue'
import { Vue, Component, Provide, ProvideReactive } from 'vue-property-decorator'
import { Ccc } from '@/interface'
import ChildComponent from './child'
@Component({
    components: {
        ChildComponent
    }
})
export default class ProvideComponent extends Vue {
  @Provide() public aaa: string = '啊啊啊'
  @ProvideReactive() public bbb: string = '不不不'
  @Provide() public ccc: Ccc = { name:'ccc', age:'18' }
  private render(h:CreateElement): VNode {
    return <div>
      <div>
        <p>
          Provide: {this.aaa}
          <button onClick={ () => this.aaa = '嗷嗷嗷'}>change</button>
          
        </p>
        <p>
          ProvideReactive: {this.bbb}
          <button onClick={ () => this.bbb = '变变变'}>change</button>
        </p>
      </div>
      <ChildComponent />
    </div>
  }
}