<template>
    <li>
        <label>
        <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
        <!-- 如下代码可以实现勾选or取消勾选的功能，但违反了props不可以修改的原则 -->
        <!-- <input type="checkbox" v-model="todo.done"> -->
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input 
        type="text"
        v-show="todo.isEdit"  
        :value="todo.title" 
        @blur="handleBlur(todo,$event)"
        ref="inputTitle"
        >
        </label>
        <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
        <button class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
    </li>
        
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name: 'MyItem',
    methods: {
        // 勾选or 取消勾选
        handleCheck(id){
            // 通知App组件将对应的todo对象的done值取反
            this.$bus.$emit('checkTodo',id)
        },
        // 删除所选项
        handleDelete(id){
            if(confirm('确定删除吗？')){
            // 通知App组件将对应的todo对象删除
            // this.$bus.$emit('deleteTodo',id)
            pubsub.publish('deleteTodo',id)
            }
        },
        // 编辑
        handleEdit(todo){
            if(todo.hasOwnProperty('isEdit')){
                todo.isEdit = true
            }else{
                // 给todo添加一个isEdit的属性，以判断todo项是否处于编辑状态
                this.$set(todo,'isEdit',true)
                console.log(todo)
                console.log('@')
            }
            this.$nextTick(function(){
                this.$refs.inputTitle.focus()
            })
        },
        // 当元素失去焦点时，触发blur事件(真正执行修改逻辑)
        handleBlur(todo,e){
            todo.isEdit = false
            if(!e.target.value.trim()) return alert('输入不能为空!')
            this.$bus.$emit('updateTodo',todo.id,e.target.value)
        }
    },
    // 声明接收对象
    props:['todo']
}
</script>

<style scoped>
    /*item*/
    li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    }

    li label {
    float: left;
    cursor: pointer;
    }

    li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
    }

    li button {
    float: right;
    display: none;
    margin-top: 3px;
    }

    li:before {
    content: initial;
    }

    li:last-child {
    border-bottom: none;
    }
    li:hover {
        background-color: #ddd;
    }
    li:hover button {
        display: block;
    }
</style>