<template>
    <div class="container">
        <!-- <Category title="食物" :listData="foods"/>
        <Category title="游戏" :listData="games"/>
        <Category title="电影" :listData="films"/> -->
        <Category title="游戏">
            <!-- 解构赋值 -->
            <template scope="atguigu">
                {{ atguigu }}
            </template>
        </Category>
        <Category title="游戏">
            <template scope="games">
                <ul>
                    <li v-for="(g,index) in games" :key="index">{{ g }}</li>
                </ul>
            </template> 
        </Category>
        <Category title="游戏">
            <template scope="{games}">
                <ol>
                    <li v-for="(g,index) in games" :key="index">{{ g }}</li>
                </ol>
            </template> 
        </Category>
         
        
    </div>
</template>

<script>
// 汇总所有组件
import Category from './components/Category.vue'
    export default {
        name: 'App',
        components: {Category},
        
    }
</script>

<style>
    .container{
        display: flex;
        justify-content: space-around;
    }      
    h4{
        display: flex;
        justify-content: space-around;
    }
</style>
