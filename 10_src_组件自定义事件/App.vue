<template>
    <div class="app">
        <h1>{{ msg }}，学生姓名是：{{ studentName }}</h1>
        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法，使用@或v-on) -->
        <!-- <Student v-on:atguigu.once="getStudentName"/> -->
        <!-- <Student @atguigu="getStudentName" @demo="m1"/> -->
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <School :getSchoolName="getSchoolName" />
        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法，使用ref) -->
        <Student ref="student" @click.native="show"/>
    </div>
</template>

<script>
// 汇总所有组件
import School from './components/School.vue'
import Student from './components/Student.vue'

    export default {
        name: 'App',
        data () {
            return {
                msg: '你好啊',
                studentName: ''
            }
        },
        methods: {
            getSchoolName (name) {
                console.log('App组件收到了学校名：'+name)
            },
            // getStudentName (name) {
            //     console.log('App组件收到了学生名：'+name)
            // },

            // 解构赋值
            getStudentName (name,...args) {
                console.log('App组件收到了学生名：'+name)
                this.studentName = name
            },
            m1 () {
                console.log('demo事件被触发了')
            },
            show() {
                alert('你好啊')
            }
        },
        // 注册
        components:{
            Student,
            School
        },
        mounted () {
            // this.$refs.student.$on('atguigu',this.getStudentName)

            // 当为普通函数时，this 的指向是触发'atguigu'事件的对象
            // this.$refs.student.$on('atguigu',function(name,...args){
            //     console.log('App组件收到了学生名'+name)
            //     this.studentName = name
            // })

            // 当为箭头函数时，this 的指向就是调用mounted函数的对象
            this.$refs.student.$on('atguigu',(name,...args)=>{
                console.log('App组件收到了学生名',name,args)
                console.log(this)
                this.studentName = name
            })

            // this.$refs.student.$once('atguigu',this.getStudentName)
        }
    }
</script>

<style>
    .app {
        background-color: gray;
        padding: 5px;
    }
</style>