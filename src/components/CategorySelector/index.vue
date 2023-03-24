<template>
  <div>
      <!-- 
          Form表单-行内表单###1
            #inline属性：代表的是行内表单，代表一行可以放置多个表单元素
            #model属性：收集用户选择的所有表单选项
            form-item
                select
                    #v-model 动态的收集与展示用户选择展示的表单选项ID
                    option
                        #value 提交用户选中的表单选项ID
      -->
      <!-- ###16 父子间通信，控制三级联动菜单的可选中性 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm" :disabled = "!show">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categorySelector",
  props: ['show'],
  data() {
    return {
        // 一级分类的数据
        list1: [],
        // 二级分类的数据
        list2: [],
        // 三级分类的数据
        list3: [],
        // 收集一级二级三级分类的id
        cForm: {
            category1Id: '',
            category2Id: '',
            category3Id: ''
        }
    }
  },
  mounted () {
      this.getCateGory1List()
      // console.log(this.show)
  },
  methods: {
    //   选择展示一级分类标题
      async getCateGory1List () {
        let result = await this.$API.attr.reqGetCateGory1()
        // console.log(result)
        if(result.code == 200) {
            this.list1 = result.data
        }
      },

    // ###2
    //   一级分类的select事件回调(当一级分类的option发生变化的时候获取相应二级分类的数据)
      async handler1 () {
        // 解构出一级分类的id  
        const {category1Id} = this.cForm
        // ###3 当一级分类id发生改变的时候，清除二级、三级分类内容
        this.list2 = ''
        this.list3 = ''
        // 清空上一次请求下拉框select中存储的选中内容
        this.cForm.category2Id = ''
        this.cForm.category3Id = ''
        // ###4 父组件用自定义事件getCategoryId获取子组件的一级菜单id，并且标记为1
        this.$emit('getCategoryId',{categoryid: category1Id,level: 1})
        let result = await this.$API.attr.reqGetCateGory2(category1Id)
        // console.log(result)
        if(result.code == 200) {
            this.list2 = result.data
        }
      },
      //   二级分类的select事件回调(当二级分类的option发生变化的时候获取相应三级分类的数据)
      async handler2 () {
          const {category2Id} = this.cForm
        //   ###3 当二级分类id发生改变的时候，清除三级分类内容
          this.list3 = ''
          this.cForm.category3Id = ''
          // ###4 父组件用自定义事件getCategoryId获取子组件二级菜单id，并且标记为2
          this.$emit('getCategoryId',{categoryid:category2Id,level:2})
          let result = await this.$API.attr.reqGetCateGory3(category2Id)
          if(result.code == 200) {
              this.list3 = result.data
          }
      },
      //   三级分类的select事件回调(当三级分类的option发生变化的时候#########)
      handler3 () {
          const {category3Id} = this.cForm
          // ###4 父组件用自定义事件getCategoryId获取子组件的三级菜单id，并且标记为3
          this.$emit('getCategoryId',{categoryid:category3Id,level:3})
      }
  },
  watch: {
    "show" () {
      console.log("CategorySelector/index:109-----三级菜单可操作性为："+this.show)
    }
  }
};
</script>

<style>
</style>