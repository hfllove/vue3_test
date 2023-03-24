<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :todos="todos">
        <!-- 书写template -->
        <!-- slot-scope定义了两个值的名字：
        第一个flag，是从子组件传过来的每一个数组元素，包裹成一个对象的名字。 
        第二个flag，代表的是每个数组元素的名字
        -->
        <template slot-scope="flag">
            <h5 :style="{color:flag.flag.isComplete?'green':'black'}">{{flag.flag.text}}</h5>
            <h5 :style="{color:flag.flag.isComplete?'green':'black'}">{{flag.flag}}</h5>
            <h5 :style="{color:flag.flag.isComplete?'green':'black'}">{{flag}}</h5>
        </template>
    </List>
     <List :todos="todos">
        <!-- 书写template -->
        <template slot-scope="flag">
            <a :style="{color:flag.flag.isComplete?'green':'black'}">{{flag.flag.text}}</a>
        </template>
    </List>
    <hr>
    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List1 :data="todos">
         <template slot-scope="{row,index}">
               <h1 :style="{color:row.isComplete?'green':'hotpink'}">索引值{{index}}---------{{row.text}}</h1>
         </template>
    </List1>
  </div>
</template>

<script type="text/ecmascript-6">
  //子组件
  import List from './List'
  import List1 from './List1'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      List1 
    }
  }
</script>
