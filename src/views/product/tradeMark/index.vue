<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 15px 0"
      @click="showDialog"
      >添加</el-button
    >

    <!--
        表格组件 
        data：表格组件将来需要展示的数据 --- 数组类型
        border：纵向的边框
        column: 每列
        label：显示的标题
        align: 对齐方式---center/left/right

        注意：
        elementUI表格组件是以列的形式来展示数据的
    -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        width=""
      ></el-table-column>
      <el-table-column label="品牌Logo" prop="prop" width="">
        <template slot-scope="{ row }"
          ><img :src="row.logoUrl" alt="" style="height: 100px; width: 100px"
        /></template>
      </el-table-column>
      <el-table-column label="操作" prop="prop" width="">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 
        分页器
        主要包括： 当前页码数current-page、总页数total、每页展示的条数page-size
        layout显示在页面上的排序和传入的属性一致 
        ->代表是后面的属性位置显示为最右排列
        pager-count: 按钮的数量 如果为9 连续页码是7
        @current-change：自定义事件，默认传入当前点击页码page的值。
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @size-change="handleSizeChange"
      @current-change="getPageList"
      :current-page="page"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
    >
    </el-pagination>

    <!-- 
      弹出对话框dialog
      1. :visable.sync: 控制对话框显示与隐藏
      2. rules: 存储表单的验证规则，prop是需要校验的字段名
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form width="80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="图片上传" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearTradeMarkInfo">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  mounted() {
    this.getPageList();
  },
  data() {
    // elementUI提供的自定义校验函数
    /*
    ###3
      rule 是相应的规则
      value 是输入文本
      callback  放行 
    */
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称为2-10位"));
      } else {
        callback();
      }
    };
    return {
      list: [],
      // 初始化数据
      // 每页的条数
      limit: 3,
      // 当前页
      page: 1,
      // 总页数
      total: 0,
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      // 收集品牌管理的弹出对话框数据
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // dialog弹框表单的验证规则
      /*
      ###1
      rules: 存储所有的表单对象验证规则
      prop：表示当前校验对象的字段
        required 代表的是当前字段需要校验，页面有*号提示。
        trigger  用户行为的设置 （事件）
          blur  失焦
          change  文本发生变化
        validator  表示自定义校验规则，可以自己定义校验的规则
      */
      rules: {
        // 品牌名字的校验规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // 自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        // 品牌logo的校验规则
        logoUrl: [{ required: true, message: "请选择品牌logo" }],
      },
    };
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      // console.log(this.$API.trademark.reqTradeMarkList)
      this.page = pager;
      const { limit, page } = this;
      let result = await this.$API.trademark.reqPageList(page, limit);
      // console.log(result)
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    // 当分页器某一页需要展示数据的条数发生改变时会触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
    },
    // 点击修改品牌的按钮
    updateTradeMark(row) {
      // 显示对话框
      this.dialogFormVisible = true;
      // console.log(row)
      // 扩展运算符 浅拷贝
      // this.tmForm是弹出框的数据，row是品牌列表展示的数据，通过运算符浅考贝，使得row的值不会被改变
      this.tmForm = { ...row };
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // res: 服务器存储图片后返回的图片存储地址信息
      // file：图片的名字和服务器设置的图片信息
      // 收集品牌图片信息
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前的图片格式校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //品牌管理 确定按钮 (添加/修改品牌管理)
    addOrUpdateTradeMark() {
      //  提交表单验证
      // ###2
      this.$refs.ruleForm.validate(async (success) => {
        // 如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          // 发请求 (添加品牌|修改品牌)
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          // console.log(result)
          if (result.code == 200) {
            // 弹出信息
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或者修改品牌成功后，需要再次获取品牌列表进行展示
            // 判断：如果是修改品牌，就停留在当前页，如果是添加品牌，就停留在第一页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("错误提交!!");
          return false;
        }
      });
    },
    // 取消按钮 清除(添加/修改)品牌管理信息
    clearTradeMarkInfo() {
      this.dialogFormVisible = false;
      // 清除数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    // ###4 
    // 删除按钮 删除选中的品牌管理信息
    deleteTradeMark (row) {
      // console.log(row)
      this.$confirm( `你确定要删除${row.tmName}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if(result.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            // 如果当前页的列表展示数据大于1，就停在当前页
            // 如果当前页的列表展示数据小于等于1，就返回上一页
            this.getPageList(this.list.length>1?this.page:this.page-1)
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>