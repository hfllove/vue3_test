<template>
  <div>
    <!-- element控件 card卡片###1 -->
    <el-card style="margin: 20px 0px">
      <!-- 三级联动菜单 -->
      <!-- ###16 控制三级菜单的可选中性 -->
      <categorySelector @getCategoryId="getCategoryId" :show="isShowTrade"></categorySelector>
    </el-card>
    <el-card>
      <!-- ###6 切换显示结构 -->
      <div v-show="isShowTrade">
        <!-- ###5 完成静态页面和处理服务器数据-->
        <!-- 添加按钮 -->
        <!-- 
          ###6 
          1. 三级分类id选中时，让按钮变为可选 
          2. 点击【添加属性】或者 【修改属性】按钮，要隐藏品牌属性展示，显示品牌属性更改结构
          -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="isShowAttr"
          >添加属性</el-button
        >
        <!-- 表格展示平台属性 -->
        <el-table :data="attrList" style="width: 100%" border>
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <!-- 属性名称 -->
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <!-- 属性值列表 -->
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="prop" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- ###6 添加 | 修改属性 页面结构 -->
      <div v-show="!isShowTrade">
        <!-- 表单 -->
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加属性值按钮 ###8-->
        <!-- ###16 控制【添加属性值】按钮的可选中性 -->
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
        :disabled="attrInfo.attrName==''"  >添加属性值</el-button
        >
        <el-button>取消</el-button>
        <!-- 表格 -->
        <!-- ###8 收集到attrInfo的属性attrValueList -->
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- ###11 这里结构需要用到span与input进来来回切换 -->
              <!-- 
                  当flag为true时，属性为编辑模式
                  flag为false时，属性为查看模式
                  默认为编辑模式。
                  当文本内容改变，并失去焦点时，切换为查看模式。
                  点击查看模式的文本，会切换为编辑模式
                -->
              <!-- ###13
                  :ref = "$index"给每个input组件都根据组件下标绑定自定义名称，点击到哪个就根据$index的值聚焦
                -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <!--###13 点击查看模式下的属性值，会切换到编辑模式，并且实现鼠标的聚焦 -->
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block; padding: 4px 5px"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <!-- ###14 使用Popconfirm组件对【删除】属性值进行提示 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
               <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 最终的提交按钮 -->
        <template slot-scope="{ row, $index }">
          {{ row }}
        </template>
        <el-button @click="isShowTrade = true">取消</el-button>
        <!-- ###16 控制【保存】按钮的可选中性 -->
        <el-button type="primary" @click="saveAttrValue" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入loadash中的深拷贝cloneDeep
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      //   收集一二三级分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //   品牌分类数据
      attrList: [],
      //   切换 品牌展示/品牌修改 页面显示
      isShowTrade: true,
      // ###7   收集的品牌属性和属性值
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          //###8 属性值有多个，数组类型，通过点击【添加按钮】动态存入用户添加的属性
          // {
          //   attrId: 0,
          //   valueName: "",
          // },
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 为三级分类的标题
      },
      // 删除属性值弹框是否可见
      visible: false,
    };
  },
  methods: {
    //   ###4 来自子组件'@/components/CategorySelector'
    //  父组件通过自定义事件，收集一二三级分类id和一二三级分类的标识level
    getCategoryId({ categoryid, level }) {
      if (level == 1) {
        this.category1Id = categoryid;
        //   当收集的一级分类id发生改变，要重置二级、三级分类id，因为自定义事件是分别在一二三级里触发，但是页面的一二三级菜单，具有联动性。
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryid;
        this.category3Id = "";
      } else {
        this.category3Id = categoryid;
        //   只有当一二三级分类的id都存储到data中时，才发请求获取品牌属性
        this.getAttrList();
      }
    },
    //   获取品牌属性
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqGetAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // ###8 点击按钮【添加属性值】动态的添加属性
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, // 当用户点击修改按钮时，将属性的id同时带给属性值
        valueName: "",
        // ###11 给每个新添加的属性增加一个切换编辑和查看属性值的标识flag，保证每个属性切换编辑和查看模式互不影响
        flag: true,
      });
    },
    // ###9 点击【添加属性】，隐藏当前属性列表，显示添加属性页面结构
    isShowAttr() {
      this.isShowTrade = false;
      this.attrInfo.attrName = "";
      this.attrInfo.attrValueList = [];
    },
    // ###10 点击【修改属性】，隐藏当前属性列表，展示点击的属性页面结构
    updateAttr(row) {
      // console.log(row)
      this.isShowTrade = false;
      this.attrInfo = cloneDeep(row);
      // ###12 当点击【修改按钮】时，要给当前属性值添加一个flag切换修改和查看模式的标识。
      this.attrInfo.attrValueList.forEach((item) => {
        // 因为vue无法探测普通的新增property，即普通的新增属性是响应式属性
        // 第一个参数：对象 第二个参数： 添加新的响应属性 第三个参数：新的属性的值
        this.$set(item, "flag", false);
      });
    },
    // ###11 失去焦点或者按下Enter时，将属性值切换为查看模式
    toLook(row) {
      row.flag = false;
      // ###12 当用户确认添加该属性值时，对属性值进行校验
      /*
        1. 添加的属性值不能是空字符串
          当用户输入空字符串时，给用户进行提示。
          保持当前属性值为编辑模式
          清除空字符串的值
        2. 添加的属性值不能和已有的属性值重复
          用some方法遍历属性值列表，去除与row重复的属性值，判断row中的属性值是否和余下的属性值相等。
          如果相等，则给用户进行提示，并且清除重复的属性值，保持当前属性值为编辑模式
        row.valueName.trim()表示去除字符串两边的空白
      */
      if (row.valueName.trim() == "") {
        this.$message("属性值不能为空串！！！");
        row.flag = true;
        row.valueName = "";
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // row是用户选择的属性值，需要把它从属性值列表中去掉
        // 与余下的属性值的名字进行对比
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message("属性值重复！！！");
        row.flag = true;
        row.valueName = "";
        return;
      }
    },
    // ###13 点击查看模式的属性值，切换为编辑模式，且鼠标实现聚焦
    /*
      点击span ，切换为input，会导致浏览器重排和重绘，这需要耗费时间，所以需要nextTick实现节点渲染完毕后，再完成聚焦
    */
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        // console.log(this.$refs)
        // ###13 根据$refs的下标，获取相应的input元素实现聚焦
        this.$refs[index].focus();
      });
    },
    // ###14 点击属性值的【删除】按钮，删除当前选择的属性值
    deleteAttrValue (index) {
      // 不需要发请求给服务器
      this.attrInfo.attrValueList.splice(index,1)
    },
    // ###15 保存当前添加的所有属性值
    /*
      1.整理参数
      如果当前属性值为编辑模式，则不能进行保存，提示用户重新填写属性值
      2.向服务器发请求更新数据
      否则：
        删除当前属性值的flag属性，带着添加或者修改的属性和属性值向服务器发请求，更新服务器数据
        用try...catch接收服务器返回的结果，
        如果成功，则再发请求更新品牌属性列表展示页面的数据
        提示用户添加成功
        跳转到品牌显示页面
    */
    async saveAttrValue () {
        let flagStatus = this.attrInfo.attrValueList.every(item=>{
          return item.flag == false
        })
        if(flagStatus == false){
          this.$message({
            type:'error',
            message: '属性值不能为空，请重新添加！！'
          })
        }else{
          // console.log("成功添加！！")
          this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
            delete item.flag
            return true
          })
          try {
            let result = await this.$API.attr.reqSaveOrUpdateAttrInfo(this.attrInfo)
            this.getAttrList()
            this.$message({
              type: 'success',
              message: '属性值添加成功！！'
            })
            this.isShowTrade = true
          } catch (error) {
            this.$message({
              type: 'error',
              message: '网络出错，请重试'
            })
          }
          
        }
      
      
    }
  },
};
</script>

<style>
</style>