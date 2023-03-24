<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <SecKill></SecKill>
    <LeSpec></LeSpec>
    <NiceGood></NiceGood>
    <LeCore></LeCore>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import SecKill from '@/pages/Home/SecKill'
import LeSpec from '@/pages/Home/LeSpec'
import NiceGood from '@/pages/Home/NiceGood'
import LeCore from '@/pages/Home/LeCore'

export default {
    name: '',
    //   注册
    components: {
        ListContainer,
        SecKill,
        LeSpec,
        NiceGood,
        LeCore
    },
    // mounted () {
      
    // }
}
</script>

<style scoped>
</style>