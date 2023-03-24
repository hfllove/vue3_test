<template>
    <div>
        <h1 style="text-align: center;padding: 10px auto;">40-element按钮组件的使用</h1>
        <button>原生的按钮</button>
        <input type="text">
        <hr>
        <atguigu-row>
            <atguigu>默认按钮</atguigu>
            <atguigu type="primary">主要按钮</atguigu>
            <atguigu type="success">成功按钮</atguigu>
            <atguigu type="info">信息按钮</atguigu>
            <atguigu type="warning">警告按钮</atguigu>
            <atguigu type="danger">危险按钮</atguigu>
        </atguigu-row>
        <hr>
        <atguigu-date-picker
            type="date"
            placeholder="选择日期">
        </atguigu-date-picker>
    </div>
</template>

<script>
// 汇总所有组件
    export default {
        name: 'App',
        components: {},
        mouted () {
            // console.log('App',this)
        }
    }
</script>


