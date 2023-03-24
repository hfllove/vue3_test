<template>
<div>
    <el-card style="margin: 20px 0px">
        <!-- ###1 三级联动菜单静态部分  -->
        <categorySelector @getCategoryId="getCategoryId" :show="scene==0"></categorySelector>
    </el-card>
    <el-card>
        <!-- ###1 
            这个区域由添加按钮、spu表格、以及分页器三部分组成
            按照结构 -> 页面文本 -> 样式 进行静态部分的完善
        -->
        <div v-show="scene==0">
            <!-- 添加SPU -->
            <!-- ###4 绑定点击事件，切换到添加Spu内容组件 -->
            <el-button type="primary" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>
            <!-- SPU展示 -->
            <!--
            ###2 页面展示服务器返回的spu列表数据
            -->
            <el-table style="width: 100%" :data="records" border>
                <el-table-column type="index" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="spuName" label="SPU名称" width="width">
                </el-table-column>
                <el-table-column prop="description" label="SPU描述" width="width">
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="width">
                    <!-- ###2 操作列表数据的四个按钮，可以用HitnButton进行替换 -->
                    <template slot-scope="{row,$index}">
                        <hitn-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hitn-button>
                        <!-- ###4 修改Spu绑定点击事件 -->
                        <hitn-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hitn-button>
                        <hitn-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="findSpu(row)"></hitn-button>
                        <!-- ###6 删除Spu---Popconfirm气泡提示框 -->
                        <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                            <!-- reference	触发 Popover 显示的 HTML 元素 -->
                            <hitn-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hitn-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @size-change = "handleSizeChange"
                @current-change = "getSpuList"
                align = "center"
                :current-page="page"
                :page-sizes="[3, 5, 7]"
                :page-size="limit"
                layout=" prev, pager, next, jumper,->, sizes,total"
                :total="total">
            </el-pagination>
        </div>
        <!-- 
            ###3 切换内容的子组件：
            根据scene取值的不同，显示不同的子组件
        -->
        <!-- 
        ###5 
        给子组件绑定自定义事件，获取子组件传递的scene切换内容标识
        绑定ref属性，在父组件中获取子组件的方法并且传入父组件的参数。
        -->
        <SpuForm v-show="scene==1" @changeScene="goScene" ref="spuform"></SpuForm>
        <SkuForm v-show="scene==2" ref="skuform" @changeScenes="changeScenes"></SkuForm>
    </el-card>
    <!-- ###9 查看Sku的弹框dialog -->
    <el-dialog
        :title="`${spu.spuName}的列表`"
        :visible.sync="dialogVisible"
        :before-close="close"
        width="width">
        <!-- table表格展示SkuInfo的静态数据 -->
        <!-- 
            ###10 loading 区域加载
            如果直接在服务器返回成功的结果后关闭加载，可能会出现再次点击其他项时不会显示加载动画或者显示上一个选择项。
        -->
        <el-table
            v-loading="loading"
            :data="skuInfoList"
            style="width: 100%" >
            <el-table-column
                prop="skuName"
                label="名称"
                width="width">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="width">
            </el-table-column>
            <el-table-column
                prop="weight"
                label="重量"
                width="width">
            </el-table-column>
            <el-table-column
                prop="prop"
                label="默认图片"
                width="width">
                <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" alt="" style="height:100px;width:100px;">
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</div>
</template>

<script>
// ###3 引入拆分的切换内容子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
    name: "Spu",
    components:{
        SpuForm,
        SkuForm
    },
    data () {
        return {
            // 三级分类菜单的一级菜单
            category1Id: '',
            // 二级菜单
            category2Id: '',
            // 三级菜单
            category3Id: '',
            // ###2 存储Spu列表的数据
            records: [],
            // ###2 存储分页器需要的总条数、当前页码、每页展示条数
            total: 0,
            page: 1,
            limit: 3,
            // ###3 Spu切换内容的标识scene
            scene: 0,
            // ###9 隐藏弹框的属性
            dialogVisible: false,
            // 当前元素的属性
            spu: {},
            // SkuInfo的信息
            skuInfoList: [],
            // 区域加载
            loading: true
        }
    },
    methods: {
        // 收集三级联动菜单数据
        getCategoryId({categoryid,level}){
            if(level==1){
                this.category1Id = categoryid 
            }else if(level == 2){
                this.category2Id = categoryid
            }else {
                this.category3Id = categoryid
                this.getSpuList()
            }
        },
        // 获取Spu数据
        async getSpuList (pager=1) {
            // ###2 发请求获取服务器返回的Spu列表数据和分页器数据
            this.page = pager
            const {page,limit,category3Id} = this
            let result = await this.$API.spu.reqSpuPageList(page,limit,category3Id)
            // console.log(result)
            if(result.code == 200){
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        /* 
        ###2 分页器自定义回调事件：
            @current-change 点击分页跳转到指定页
                更新当前页和获取Spu数据可以进行合并
            @size-change 点击修改每页显示不同的条数
        */
    //    handleCurrentChange (page) {
    //        this.page = page
    //        this.getSpuList()
    //    },
    // @size-change 点击修改每页显示不同的条数
       handleSizeChange (limit) {
        //    console.log(limit)
        this.limit = limit
        this.getSpuList()
       },

    // ###4  点击【添加Spu】按钮 绑定点击事件，切换到添加Spu内容组件
       addSpu () {
           this.scene = 1
           this.$refs.spuform.addSpuData(this.category3Id)
       },
    // ###4 点击【修改Spu】按钮 绑定点击事件，切换到修改Spu内容组件
       updateSpu (row) {
           this.scene = 1
        // ###5 通过ref属性调用子组件SpuForm的方法，向子组件传递当前点击的元素。
           this.$refs.spuform.initSpuData(row)
       },
    // ###5 点击【取消】 触发自定义事件回调
    // 从SpuForm内容切换到Spu品牌列表，子组件SpuForm向父组件Spu传递标识scene
    // flag用于标识是否向服务器再次发请求更新SPU页面
       goScene ({scene,flag}) {
            this.scene = scene
            // 子组件通知父组件切换内容，需要再次获取SPU列表数据进行展示
            if(flag=='修改'){
               this.getSpuList(this.page) 
               console.log("Spu/index：152---修改Spu成功。。。")
            }else if(flag=='添加'){
                this.getSpuList()
                console.log("Spu/index：156---添加Spu成功。。。")
            }else{
                console.log("Spu/index：158---取消操作。。。")
                return;
            } 
        },
        // ###6 点击PopConfirm气泡弹框中的【确定】，删除Spu的回调
       async deleteSpu (row) {
           console.log(row)
           let result = await this.$API.spu.reqDeleteSpu(row.id)
           console.log(result)
           if(result.code == 200) {
               this.$message({type:'success',message:'删除成功！'})
            // 如果当前列表页的数据只有一条，则返回到上一页   
               this.getSpuList(this.records.length>1?this.page:this.page-1)
           }
       },
    //  ###7  点击【添加sku】的回调
       addSku (row) {
        //    切换到skuform内容页面
           this.scene=2
           const {category1Id,category2Id} = this
        //    console.log(this.$refs)
        // 通过$refs(所有子组件的根节点)，给子组件传递当前选中的元素
        this.$refs.skuform.initSkuData(row,category1Id,category2Id)
       },
    //    ###8 传递给子组件SpuForm的自定义事件
       changeScenes(scene) {
           this.scene = scene
       },
    //    ###9 查看Sku的回调
       async findSpu(spu) {
           console.log(spu)
           this.dialogVisible = true
           this.spu = spu
           let result = await this.$API.spu.reqFindSku(spu.id)
        //    console.log(result)
           if(result.code == 200) {
               this.skuInfoList = result.data
               this.loading = false
           }
       },
    // ###10 关闭dialog前的回调
        close (done) {
            // 开启加载
            this.loading = true
            // 清空打开的弹框内容
            this.skuInfoList = []
            // 关闭弹框
            done()
        }  
    }

}
</script>

<style>

</style>