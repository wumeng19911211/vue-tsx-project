import { CreateElement, VNode } from 'vue'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component
export default class RefComponent extends Vue {
  @Ref('mybtn') public readonly theBtn!: HTMLButtonElement;
  public clickHandler() {
    console.log(this.theBtn)
    console.log(this.$refs.mybtn)
  }
  private render(h:CreateElement): VNode {
    return <div>
      <button ref="mybtn" onClick={ this.clickHandler }>嘿嘿嘿</button>
    </div>
  }
}