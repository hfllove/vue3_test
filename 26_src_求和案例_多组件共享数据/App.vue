<template>
    <div>
        <Count/>
        <hr>
        <Person/>
    </div>
</template>

<script>
// 汇总所有组件
import Count from './components/Count.vue'
import Person from './components/Person.vue'
    export default {
        name: 'App',
        components: {Count,Person},
        mouted () {
            // console.log('App',this)
        }
    }
</script>


