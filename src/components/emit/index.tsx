import { CreateElement, VNode } from 'vue'
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'

@Component
export default class EmitComponent extends Vue {
  @Emit('addCount')
  public addCountClick() { return }
  private render(h:CreateElement): VNode {
    return <div>
        子组件：<button onClick={ this.addCountClick }>addCount</button>
    </div>
  }
}