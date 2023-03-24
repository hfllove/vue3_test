<template>
  <!-- ###1 静态Spu内容组件 -->
  <div style="margin: 10px 0">
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <!-- ###3 v-model双向绑定，收集数据到spu中 -->
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!--###3 v-model的值为当前被选中的el-option的 value 属性值 -->
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- ###3 展示图片
          action 图片上传的地址
          on-preview 点击预览上传图片时触发
          on-remove 点击删除上传图片时触发
          file-list 上传的图片列表
          list-type 文件类型
        -->
        <el-upload
          action="/dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- ###5 未选择的销售属性展示 -->
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelect.length}未选择`" v-model="unSelectIdAndName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelect" :key="unselect.id"></el-option>
        </el-select>
        <!-- ###5 添加销售属性的可选中性要和未选择销售属性值应该相反 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!unSelectIdAndName" @click="addUnSelect">添加销售属性</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          :data="spu.spuSaleAttrList"
          border
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="saleAttrName"
            label="属性名"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="prop"
            label="属性值名称列表"
            width="width"
          >
          <!-- 
            ###4 tag标签组件 
            row是当前列的某个选择的属性
          -->
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
                >{{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="prop" label="操作" width="200">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
            
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      thisUrl: 'src/views/product/Spu/SpuForm/index.vue',
      // upload照片墙上传相关数据
      dialogImageUrl: "",
      dialogVisible: false,
      // ###2 初始化SpuForm数据
      // ###3 收集点击【修改spu】后修改的最新的数据
      spu: {
        // 三级分类菜单
        category3Id: 0,
        // 描述
        description: "",
        // spu名称
        spuName: "",
        // 平台的id
        tmId: "",
        // 收集SPU图片的信息
        spuImageList: [
          // {
          //   imgName: "",
          //   imgUrl: "",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, // 存储SPU信息属性
      tradeMarkList: [], // 存储品牌信息
      spuImageList: [], // 存储Spu图片的数据
      saleAttrList: [], // 存储平台全部销售属性
      unSelectIdAndName: "" // 存储未选择的销售属性
    };
  },
  methods: {
    // upload照片墙上传相关方法
    // ###6 照片墙图片删除时的回调
    handleRemove(file, fileList) {
      // file 被删除的图片信息
      // fileList 剩余的图片信息
      // console.log(file, fileList);
      this.spuImageList = fileList
    },
    // ###6 照片墙预览的回调
    handlePictureCardPreview(file) {
      // file.url 图片存储在服务器端的地址
      // dialogVisable 控制弹出对话框的显示
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // ###6 照片墙添加图片的回调
    handleSuccess(response,file,fileList) {
      // response 是图片上传成功的返回结果
      // console.log(response,file,fileList)
      this.spuImageList = fileList
    },
    // ###2 初始化SpuForm数据
    async initSpuData(spu) {
      // 获取Spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      // console.log(spuResult);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(spuImageResult);
      if (spuImageResult.code == 200) {
        // ###3 由于照片墙显示图片的数据需要数组，且数组里面的元素需要name和url字段，需要调整服务器返回的数据
        let imageList = spuImageResult.data;
        imageList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = imageList;
      }
      // 获取平台全部的销售属性
      let baseSaleResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(baseSaleResult);
      if (baseSaleResult.code == 200) {
        this.saleAttrList = baseSaleResult.data;
      }
      console.log("spuId是："+this.spu.id)
    },
    // ###7 添加销售属性同时收集销售属性
    addUnSelect () {
      const [baseSaleAttrId,saleAttrName] = this.unSelectIdAndName.split(":")
      let newAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newAttr)
      this.unSelectIdAndName = ''
    },
    // ###8 点击【添加】 添加销售属性值
    addSaleValue(row) {
      /*
        非响应式的属性添加，使用$set方法
        当inputVisible为true，表示显示input框
        用$set收集用户输入的字段inputValue
      */
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    // ###8 鼠标在【添加】销售属性值失焦的回调
    handleInputConfirm (row) {
      const {baseSaleAttrId,inputValue} = row
      // 校验输入值 属性值不能为空
      if(inputValue.trim()==''){
        this.$message({
          type: 'warning',
          message: '属性值不能为空！！！'
        })
        return;
      }
      let result = row.spuSaleAttrValueList.some(item=>{
        return item.saleAttrValueName == inputValue
      })
      // 校验属性值 属性值不能重复
      if(result) {
        this.$message({
          type: "warning",
          message: "不能重复添加属性值！！！"
        })
        return;
      }
      // 将添加的属性值存储，并展示到页面
      let newAttr = {baseSaleAttrId,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newAttr)
      // 显示button
      row.inputVisible = false
    },
    // ###9 点击【保存】 收集修改或者添加spu的回调
    async addOrUpdateSpu () {
      // 整理参数：整理照片墙的数据
      // 携带参数：对于图片，需要携带imgName与imgUrl字段
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imgName: item.name,
          imgUrl: (item.response&&item.response.data) || item.url
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // 提示用户保存成功
      if(result.code == 200) {
        this.$message({type: 'success',message:'保存成功'})
      }
      // 通知父组件回到spu品牌展示页面
      this.$emit('changeScene',{scene: 0,flag:this.spu.id?'修改':'添加'})
      // 清除SpuForm中修改的内容
      Object.assign(this._data,this.$options.data())
    },
    // ###10 点击【添加Spu】 父组件Spu通知子组件SpuForm向服务器派发请求，获取品牌选项和销售属性选项
    async addSpuData (category3Id) {
      // 点击【添加SPU】按钮时，收集三级分类id
      this.spu.category3Id = category3Id
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台全部的销售属性
      let baseSaleResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(baseSaleResult);
      if (baseSaleResult.code == 200) {
        this.saleAttrList = baseSaleResult.data;
      }
      console.log("spuId是"+ this.spu.id)
    },
    // ###10 点击【取消】按钮 清空SpuForm之前添加的内容
    cancel () {
      // 取消按钮的回调
      this.$emit('changeScene',{scene:0,flag:''})
      // 清除SpuForm之前添加的内容
      // this._data 组件实例，可以操作data中的响应式数据
      // this.$options.data()  this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为初始化值，就是配置对象中data初始化的响应式数据
      Object.assign(this._data,this.$options.data())
    }
  },
  computed: {
    // 当前spu未选择的销售属性
    unSelect () {
      /*
        ###5 计算出当前spu未选择的销售属性
        平台销售属性总共为三个：尺寸、颜色、版本---saleAttrList
        当前SPU拥有的销售属性---spuSaleAttrList.saleAttrName
        filter过滤数组方法，返回的是一个新的数组对象
      */ 
      let result = this.saleAttrList.filter(item=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name!=item1.saleAttrName
        })
      })
      return result
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>