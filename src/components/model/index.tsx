/*
 * @Author: wumeng
 * @Date: 2021-12-23 17:01:39
 * @Description: file content
 */
import { CreateElement, VNode } from 'vue'
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class ModelComponent extends Vue {
  @Model('change', { type: Boolean }) public readonly checked!: boolean
  public mounted() {
    console.log('111111111', this.checked)
  }
  private render(h:CreateElement): VNode {
    return <div>
      <input type="checkbox" checked={this.checked} onChange={(e: Event) => this.$emit('change', e.target?.checked)} />
      嘿嘿嘿
    </div>
  }
}