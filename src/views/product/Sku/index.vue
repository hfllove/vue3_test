<template>
<div>
    <!-- ###1 表格table展示Sku分页数据 -->
    <el-table :data="records" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
        <el-table-column label="默认图片" width="110">
            <template slot-scope="{row,$index}">
                <img :src="row.skuDefaultImg" alt="" style="height:100px;width:100px;">
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="80"></el-table-column>
        <el-table-column prop="price" label="价格" width="110"></el-table-column>
        <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
                <!-- el-icon-bottom -->
                <el-button title="下架" type="success" icon="el-icon-bottom" size="mini" @click="cancelSale(row)"  v-if="row.isSale ==1"></el-button>
                <el-button title="上架" type="success" icon="el-icon-top" size="mini" @click="onSale(row)" v-else></el-button>
                <el-button title="编辑" type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button title="查看sku详情" type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
                <el-button title="删除" type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>   
        </el-table-column>
    </el-table>
    <!-- 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
     -->
     <!--###1 分页器静态 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="getSkuList"
        style="margin:15px 0"
        align="center"
        :current-page="1"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout=" prev, pager, next, jumper,->,sizes,total "
        :total="total">
    </el-pagination>
    <!-- 
        ###3 el-drawer 抽屉效果
        show-close 表示是否显示关闭按钮，默认是true
     -->
    <el-drawer
        :show-close="false"
        :visible.sync="drawer"
        size="50%"
        >
        <el-row>
            <el-col :span="5">名字</el-col>
            <el-col :span="16">{{skuInfo.skuName}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="5">描述</el-col>
            <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="5">价格</el-col>
            <el-col :span="16">{{skuInfo.price}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="5">平台属性</el-col>
            <el-col :span="16" >
                <el-tag type="success" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id">{{attr.attrName}}-{{attr.valueName}}</el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">商品图片</el-col>
            <el-col :span="16">
                <el-carousel height="400px">
                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                        <img :src="item.imgUrl" alt="" style="height:100%;">
                    </el-carousel-item>
            </el-carousel>
            </el-col>
        </el-row>
    </el-drawer>
</div>
</template>

<script>
export default {
    name: "Sku",
    data() {
        return {
            // 分页器初始化数据
            page: 1,
            limit: 10,
            total: 0,
            // 存储Sku分页数据
            records: [],
            // 控制抽屉的显示与隐藏
            drawer: false,
            // 存储Sku抽屉显示数据
            skuInfo: {}
        }
    },
    // ###1 组件一挂载就发请求获取Sku分页数据
    mounted () {
        this.getSkuList()
    },
    methods: {
        // 发请求获取Sku分页数据
        async getSkuList (pager=1) {
            this.page = pager
            const {page,limit} = this
            let result = await this.$API.sku.reqSkuPage(page,limit)
            // console.log(result)
            if(result.code==200) {
                this.records = result.data.records
                this.total = result.data.total
            }
        },
        // 处理每页展示条数的回调
        handleSizeChange (limit) {
            this.limit = limit
            console.log(this.records.length)
            this.getSkuList()
        },
        //###2 点击上架的回调 状态是上架就是0，下架就是1
        async onSale(row) {
            // console.log(row)
            let result = await this.$API.sku.reqOnSale(row.id)
            // console.log(result)
            if(result.code == 200) {
                this.getSkuList()
                this.$message({
                    type: 'success',
                    message:'上架成功！！'
                })
            }

        },
        //###2 点击下架的回调
        async cancelSale(row) {
            let result = await this.$API.sku.reqCancelSale(row.id)
            if(result.code == 200) {
                this.getSkuList()
                // console.log(row)
                this.$message({
                    type:'success',
                    message: '下架成功！！'
                })
            }
        },
        // ###3 点击【查看sku详情】的回调
        async getSkuInfo(row) {
            let result = await this.$API.sku.reqGetSku(row.id)
            console.log(result)
            if(result.code ==200) {
                this.skuInfo = result.data
                this.drawer = true
            }
        }
    }
}
</script>

<style>
/* 抽屉样式 */
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child{
      margin-bottom: 0;
  }
  
  .el-col .el-tag {
      margin-right: 8px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
/* 轮播图样式 */
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__item {
      height: 400px;
      width: 400px;
  }

</style>

<style scoped>
.el-col {
    border-radius: 4px;
  }
.el-row .el-col-5 {
    text-align: right;
    padding-right: 20px;
    font-size: 18px;
    font-weight: 700;
    opacity: 0.8;
  }
  .el-row .el-col-16 {
      width: 400px;
  }
  /* 轮播图按钮 */
/* 深度选择器 */
>>>.el-carousel__button {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: #ff4500;
  }
</style>