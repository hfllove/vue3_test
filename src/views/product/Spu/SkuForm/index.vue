<template>
  <div style="margin: 0 10px">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称" >
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
              <!-- 
                ###3  v-model="attr.attrAndValueId" 提交选择的选项到select中
              -->
            <el-select placeholder="请选择" v-model="attr.attrAndValueId" >
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择" >
                <el-option :label="saleAttrValue.saleAttrValueName" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :value="`${saleAttr.id}:${saleAttrValue.id}`">
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
          <!-- el-table ###4 图片的展示 -->
        <el-table style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange" border>
            <!-- ###4 @selection-change="handleSelectionChange" 当选择项发生变化时会触发该事件 -->
          <el-table-column
            type="selection"
            prop="prop"
            label="label"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width" >
              <template slot-scope="{row,$index}">
                  <img :src="row.imgUrl" alt="" style="width:100px;height:100px;">
              </template>
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width">
              <template slot-scope="{row,$index}">
                  {{row.imgName}}
              </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" >
              <template slot-scope="{row,$index}" >
                  <el-button type="primary" v-if="row.isDefault ==0" @click="changeDefault(row)">设为默认</el-button>
                  <el-button v-else>默认</el-button>
              </template>
              
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveSku">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
        // 品牌图片数据
      spuImageList: [],
    //   平台销售属性数据
      spuSaleAttrList: [],
    //   平台属性数据
      attrInfoList: [],
    //  ###2 收集Sku字段
      skuInfo: {
        //  第一类Sku收集的数据，父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类Sku收集的数据，通过页面v-model进行收集
        skuName: "",
        price: 0,
        weight: 0,
        skuDesc: "",
        // 第三类Sku收集的数据，需要书写代码去收集
        // 平台属性
        skuAttrValueList: [
        //   {
        //     attrId: 0,
        //     attrName: "string",
        //     id: 0,
        //     skuId: 0,
        //     valueId: 0,
        //     valueName: "string",
        //   },
        ],
        // 默认图片
        skuDefaultImg: "",
        // 收集图片数据
        skuImageList: [
        //   {
        //     id: 0,
        //     imgName: "string",
        //     imgUrl: "string",
        //     isDefault: "string",
        //     skuId: 0,
        //     spuImgId: 0,
        //   },
        ],
        // 销售属性
        skuSaleAttrValueList: [
        //   {
        //     id: 0,
        //     saleAttrId: 0,
        //     saleAttrName: "string",
        //     saleAttrValueId: 0,
        //     saleAttrValueName: "string",
        //     skuId: 0,
        //     spuId: 0,
        //   },
        ],
      },
    // ###2 展示到Sku内容页面上的字段  
      spu: {},
    //   ###4 收集图片的字段，
    skuImageList: []
    };
  },
  methods: {
    // ###1 点击spu【添加sku】的回调
    async initSkuData(spu, category1Id, category2Id) {
        // console.log(spu)
    // ###2 收集Sku数据：第一种收集父组件传来的spu数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(result)
      if (result.code == 200) {
        let list = result.data;
        // ###4 给返回的服务器图片数据添加isDefault属性，isDefault表示是否设置为默认图片
        list.forEach(item=>{
            item.isDefault = 0
        })
        this.spuImageList = list
      }
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      // console.log(result1)
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      let result2 = await this.$API.spu.reqGetAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      // console.log(result2)
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // ###4 table 表格复选框事件回调
    handleSelectionChange (selection) {
        this.skuImageList = selection
    },
    // ###4 点击【设置默认】按钮的事件回调
    changeDefault (row) {
        this.spuImageList.forEach(item=>{
            item.isDefault = 0
        })
        row.isDefault = 1
        this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // ###5 点击【取消】按钮的事件回调
    cancel () {
        this.$emit('changeScenes',0)
        // 清空SkuForm数据内容
        Object.assign(this._data,this.$options.data())
    },
    // ###5 点击【保存】按钮的事件回调
    async saveSku () {
        //  整理非v-model类型的收集数据
        const {attrInfoList,skuInfo,spuSaleAttrList,skuImageList} = this
        // 整理平台属性数据
        skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
            if(item.attrAndValueId) {
                const [attrId,valueId] = item.attrAndValueId.split(":")
                prev.push({attrId,valueId})
            }
            return prev
        },[])
        // 整理平台销售属性
        skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
            if(item.attrIdAndValueId){
                const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(":")
                prev.push({saleAttrId,saleAttrValueId})
            }
            return prev
        },[])
        // 整理图片的数据
        skuInfo.skuImageList = skuImageList.map(item=>{
            return {
                imgName: item.imgName,
                imgUrl: item.imgUrl,
                isDefault: item.isDefault,
                skuId: item.spuId,
                spuImgId: item.id
            }
        })
        // 发请求，添加Sku
        let result = await this.$API.spu.reqAddSku(skuInfo)
        // console.log(result)
        if(result.code == '200') {
            this.$message({
                type: 'success',
                message: '保存成功！！！'
            })
            this.$emit('changeScenes',0)
        }
    }
  },
};
</script>

<style>
</style>