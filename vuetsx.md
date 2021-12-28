# vue2+tsx
## 依赖组件 vue-class-component vue-property-decorator ts-loader
### vue-class-component 和 vue-property-decorator
vue-class-component的作用就是提供Component修饰器，配合ts，创建组件
像vue的一些选项我们都可以通过参数传递进去比如components、filter、directives等等
例如：
```
import Vue from 'vue'
import Component from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld'
@Component({
  components:{
    HelloWorld
  },
})
export default class HelloWorld extends Vue {
    render(){
        return <div>嘿嘿嘿</div>
    }
}
```
而vue-property-decorator与vue-class-component是一个包含的关系，vue-property-decorator依赖于vue-class-component，

#### 创建组件
首先
```
import Vue from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  render(){
    return <div></div>
  }
}
```
上面代码的意思是，声明了一个名叫HelloWorld的类，这个类继承自Vue类，那么他就拥有了Vue类上的方法，这时还不能用，我们需要使用@component装饰器，使其成为一个可以使用的vue组件


#### 添加子组件
如果我们想想这个组件添加一些组件的话，也是使用@Component装饰器
```
import Vue from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld';
@Component({
  components:{
    HelloWorld
  }
})
export default class Home extends Vue {
  render(){
    return <div>
      <HelloWorld />
    </div>
  }
}
```
同时我们想要添加filters和directives，也是通过Component传参的方式添加

#### 初始化数据
组件已经创建完成了，但是我们还差些东西，这时组件只是个静态元素组件，没有方法没有状态，所以现在我们要添加data、methods、生命周期
```
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // Declared as component data
  message = 'Hello World!'
  sayHi(){
    alert('Hi')
  }
  render(){
    return <div >{message}</div>
  }
}
```

#### @Prop(options: (PropOptions | Constructor[] | Constructor) = {}) decorator
vue-property-decorator提供Prop装饰器给我们定义props，
prop有三种方式定义
1. Constructor，例如String，Number，Boolean等，指定 prop 的类型；
   ```
   @Prop(Number) readonly propA: number | undefined
   ```
   就相当于
   ```
    propA: {
      type: Number,
    }
   ```
2. PropOptions，可以使用以下选项：type，default，required，validator
   ```
   @Prop({ default: 'default value' }) readonly propB!: string
   ```
   就相当于
   ```
    propB: {
      default: 'default value',
    }
   ```
3. Constructor[]，指定 prop 的可选类型；
   ```
   @Prop([String, Boolean]) readonly propC: string | boolean | undefined
   ```
   就相当于
   ```
    propC: {
      type: [String, Boolean]
    }
   ```

定义类型的时候 ！表示必有值
#### @PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {}) decorator
propsync的使用方式与prop基本一致，主要区别是
- @PropSync 装饰器接收两个参数：
propName: string 表示父组件传递过来的属性名；
options: Constructor | Constructor[] | PropOptions 与@Prop的第一个参数一致；
- @PropSync 会生成一个新的计算属性。
```
 @PropSync('name', { type: String }) syncedName!: string
```
相当于正常开发时使用的.sync有相同的效果，子组件修改prop会同步到父组件中，用来实现组件的双向绑定

#### @Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})

这个装饰器对应的功能就是vue中的model选项
@Model装饰器允许我们在一个组件上自定义v-model，接收两个参数：
- event: string 事件名。
- options: Constructor | Constructor[] | PropOptions 与@Prop的第一个参数一致。

```
// 父组件
<ModelComponent v-model={this.checked}></ModelComponent>
// 子组件
@Component
export default class ModelComponent extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
  mounted() {
    console.log('111111111', this.checked)
  }
  private render(h:CreateElement): VNode {
    return <div>
      <input type="checkbox" checked={this.checked} onChange={e => this.$emit('change', e.target.checked)} />
      嘿嘿嘿
    </div>
  }
}
```
我感觉这个model用的会比较少，因为使用propsync也可实现双向数据流，这种适合做一个模拟原生的输入的组件，例如element提供的el-input组件，他需要提供给使用者v-model使用

#### @Watch(path: string, options: WatchOptions = {}) decorator
watch装饰器功能对应的是watch选项

@Watch 装饰器接收两个参数：
  - path: string 被侦听的属性名；
  - options?: WatchOptions={} options可以包含两个属性 ：
    -  immediate?:boolean 侦听开始之后是否立即调用该回调函数；
    -  deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数；

发生在beforeCreate勾子之后，created勾子之前

```
@Component
export default class PropComponent extends Vue {
  count:number = 1
  @Watch('count')
  onCountChange(newval:number,oldval:number) {
    alert(newval)
  }
  private render(h:CreateElement): VNode {
    return <button onClick={ () => this.count++ }>{ this.count }</button>
  }
}
```

#### @Emit(event?: string)
- @Emit 装饰器接收一个可选参数，该参数是$Emit的第一个参数，充当事件名。如果没有提供这个参数，$Emit会将回调函数名的camelCase转为kebab-case，并将其作为事件名；
- @Emit会将回调函数的返回值作为第二个参数，如果返回值是一个Promise对象，$emit会在Promise对象被标记为resolved之后触发；
- @Emit的回调函数的参数，会放在其返回值之后，一起被$emit当做参数使用。

父组件:
```
<EmitComponent onAddCount={() => this.count ++ } ></EmitComponent>
```
子组件：
```
@Component
export default class EmitComponent extends Vue {
  @Emit('addCount')
  addCountClick() { return }
  private render(h:CreateElement): VNode {
    return <div>
      子组件：<button onClick={ this.addCountClick }>addCount</button>
    </div>
  }
}
```

#### @Ref(refKey?: string)
@Ref 装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数

```
import { Vue, Component, Ref } from 'vue-property-decorator'

import AnotherComponent from '@/path/to/another-component.vue'

@Component
export default class YourComponent extends Vue {
  @Ref() readonly anotherComponent!: AnotherComponent // this.$refs.anotherComponent 或者 this.anotherComponent
  @Ref('aButton') readonly button!: HTMLButtonElement // this.$refs.aButton 或this.button
}
```

#### Provide/Inject   ProvideReactive/InjectReactive
##### @Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey) decorator
##### @ProvideReactive(key?: string | symbol) / @InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey) decorator

提供/注入装饰器,
key可以为string或者symbol类型,

相同点:Provide/ProvideReactive提供的数据,在内部组件使用Inject/InjectReactive都可取到
不同点:
如果提供(ProvideReactive)的值被父组件修改，则子组件可以使用InjectReactive捕获此修改。

```
<!-- 祖代组件 -->
@Provide() aaa = '啊啊啊'
@ProvideReactive() bbb = '不不不'
<!-- 后代组件 -->
@Inject() readonly aaa!:string
@InjectReactive() readonly bbb!:string
```

### vuex-class
若想使用vuex，需要依赖vuex-class

