// 对外暴露的对象，可以放置组件重复的js业务
export default {
    methods: {
        geiQian(money){
            this.money-=money;
            this.$parent.money+=money;
         }
    }
}