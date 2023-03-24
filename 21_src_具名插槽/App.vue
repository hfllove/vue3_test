<template>
    <div class="container">
        <!-- <Category title="食物" :listData="foods"/>
        <Category title="游戏" :listData="games"/>
        <Category title="电影" :listData="films"/> -->
        <Category title="食物">
            <img slot="center" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F121R0113012%2F20121Q13012-9-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652274799&t=bdf01d7936d18f5bf6539c1b79e3d325" alt="">
            <a slot="footer" href="http://www.atguigu.com">更多美食</a>
        </Category>
        <Category title="游戏">
            <ul slot="center">
                <li v-for="(g,index) in games" :key="index">{{ g }}</li>
            </ul>
            <div class="foot" slot="footer">
                <a href="http://www.atguigu.com">单机游戏</a>
                <a href="http://www.atguigu.com">网络游戏</a>
            </div>
        </Category>
        <Category title="电影">
            <video slot="center" controls src="http://www.dy10000.com/wplay/37804-1-1.html" type="video/mp4"></video>
            <template v-slot:footer>
                <div class="foot">
                <a href="http://www.atguigu.com">经典</a>
                <a href="http://www.atguigu.com">热门</a>
                <a href="http://www.atguigu.com">推荐</a>
            </div>
            <h4>欢迎前来观影</h4>
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
        data () {
            return {
                foods: ['火锅','烧烤','小龙虾','蛋挞'],
                games: ['星露谷物语','饥荒','我的世界','英雄联盟'],
                films: ['《机器人瓦力》','《无敌破坏王》','《风云决》','《怦然心动》']
            }
        }
    }
</script>

<style>
    .container{
        display: flex;
        justify-content: space-around;
    }      
    img{
        width: 100%;
    }
    video{
        width: 100%;
    }
    .foot{
        display: flex;
        justify-content: space-around;
    }
    h4{
        display: flex;
        justify-content: space-around;
    }
</style>
