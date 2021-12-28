/*
 * @Author: wumeng
 * @Date: 2021-12-22 11:08:38
 * @Description: file content
 */


import { Component, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

import PropComponent from '@/components/prop'
import PropsyncComponent from '@/components/propsync'
import ModelComponent from '@/components/model'
import WatchComponent from '@/components/watch'
import EmitComponent from '@/components/emit'
import RefComponent from '@/components/ref'
import ProvideComponent from '@/components/provide';
import StateComponent from '@/components/state';

import { Tabs, TabPane } from 'element-ui'


@Component({
  components: {
    'el-tabs': Tabs,
    'el-tabs-pane': TabPane,
    PropComponent,
    PropsyncComponent,
    ModelComponent,
    WatchComponent,
    EmitComponent,
    RefComponent,
    ProvideComponent,
    StateComponent
  },
})
export default class Home extends Vue {
  public count: number = 1
  private activeName: string = 'prop'
  private checked: boolean = false
  private render (h:CreateElement): VNode {
    return <div class="home">
      <el-tabs value={this.activeName}>
        <el-tab-pane label="prop" name="prop"><PropComponent></PropComponent></el-tab-pane>
        <el-tab-pane label="propsync" name="propsync"><PropsyncComponent></PropsyncComponent></el-tab-pane>
        <el-tab-pane label="model" name="model">
          <div>{ this.checked + '' }</div>
          <ModelComponent v-model={this.checked}></ModelComponent>
        </el-tab-pane>
        <el-tab-pane label="watch" name="watch"><WatchComponent></WatchComponent></el-tab-pane>
        <el-tab-pane label="emit" name="emit">
          <div>父组件：count: { this.count }</div>
          <EmitComponent onAddCount={() => this.count ++ } ></EmitComponent>
        </el-tab-pane>
        <el-tab-pane label="ref" name="ref"><RefComponent></RefComponent></el-tab-pane>
        <el-tab-pane label="provide" name="provide"><ProvideComponent></ProvideComponent></el-tab-pane>
        <el-tab-pane label="state" name="state"><StateComponent></StateComponent></el-tab-pane>

      </el-tabs>
    </div>
  }
}
