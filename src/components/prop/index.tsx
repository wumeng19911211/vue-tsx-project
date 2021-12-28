import { CreateElement, VNode } from 'vue'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PropComponent extends Vue {
  private render(h:CreateElement): VNode {
    return <div>prop</div>
  }
}