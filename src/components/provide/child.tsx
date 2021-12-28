import { CreateElement, VNode } from 'vue'
import { Vue, Component, Inject, InjectReactive } from 'vue-property-decorator'
import { Ccc } from '@/interface'

@Component
export default class ChildComponent extends Vue {
  @Inject() public readonly aaa!:string
  @Inject() public readonly ccc!:Ccc
  @InjectReactive() public readonly bbb!: string
  public created() { 
    console.log('ccccccc', this.ccc)
  }
  private render(h:CreateElement): VNode {
    return <div>
      <p>
      Inject: {this.aaa}
        Inject: {this.ccc.name} { this.ccc.age }
      </p>
      <p>
      InjectReactive: { this.bbb }
      </p>
    </div>
  }
}