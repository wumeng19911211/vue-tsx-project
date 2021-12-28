import { Component, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const helloModule = namespace('helloworld')
console.log('helloModule', helloModule)
@Component
export default class StateComponent extends Vue {
  @State('projectName') public projectName!: string
  @State public version: string | undefined
  @Mutation('changeProjectName')
  public changeProjectName!: Function;
  @helloModule.State('moduleName') public moduleName!:string
  public render(h:CreateElement):VNode { 
    return <div>
      <div onClick={() => this.changeProjectName()} >projectName: {this.projectName}</div>
      <div>moduleName: { this.moduleName }</div>
    </div>
  }
}