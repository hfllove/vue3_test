<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" v-model="keyWord" placeholder="enter the name you search"/>&nbsp;<button @click="searchUsers">Search</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Search',
    data () {
        return {
            keyWord: ''
        }
    },
    methods: {
        searchUsers () {
            // 请求前更新List的数据
            this.$bus.$emit('updateListData',{users:[],isFirst: false,isLoading:true,errMsg:''})
            axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                response => {
                    console.log('请求成功了',)
                    // 请求成功后更新List数据
                    this.$bus.$emit('updateListData',{users: response.data.items,isLoading:false,errMsg:''})
                },
                error => {
                    console.log('请求失败了',error.message)
                    // 请求失败后更新List数据
                    this.$bus.$emit('updateListData',{users:[],isLoading:true,errMsg:error.message})
                }
            )
        }
    }
}
</script>
