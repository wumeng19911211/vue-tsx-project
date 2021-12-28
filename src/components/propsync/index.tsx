import { CreateElement, VNode } from 'vue'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PropsyncComponent extends Vue {
  private render(h:CreateElement):VNode {
    return <div>propsync</div>
  }
}