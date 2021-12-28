import { CreateElement, VNode } from 'vue'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class PropComponent extends Vue {
  public count:number = 1
  @Watch('count')
  public onCountChange(newval:number,oldval:number) {
    alert(newval)
  }
  private render(h:CreateElement): VNode {
    return <button onClick={ () => this.count++ }>{ this.count }</button>
  }
}