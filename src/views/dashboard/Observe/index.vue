<template>
<!-- ### 1 控制结构 -->
    <el-row :gutter="10">
        <el-col :span="12">
            <searchPart></searchPart>
        </el-col>
        <el-col :span="12">
            <Category></Category>
        </el-col>
    </el-row>
</template>

<script>
import Category from './Category'
import searchPart from './searchPart'
export default {
    name: 'Observe',
    components: {
        Category,
        searchPart
    }
}
</script>

<style scoped>
</style>