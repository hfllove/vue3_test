<template>
  <div class="pagination" >
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="StartNumAndEndNum.start>(parseInt(continues/2)+1)" @click="$emit('getPageNo',1)" >1</button>
    <button v-if="StartNumAndEndNum.start>(parseInt(continues/2)+1)">···</button>

    <button v-for="(page,index) in continuesList" :key="index" @click="$emit('getPageNo',page)" :class="{active: pageNo==page}">{{page}}</button>
    
    <button v-if="StartNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="StartNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
    <!-- <h1>{{StartNumAndEndNum}}</h1>
    <h2>{{continuesList}}</h2> -->
  </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['pageNo','pageSize','total','continues'],
    computed: {
      // 总页码数
      totalPage () {
        const {total,pageSize} = this
        return Math.ceil(total/pageSize)
      },
      // 连续页码数
      StartNumAndEndNum () {
        const {pageNo,continues,totalPage} = this
        let start = 0,end = 0
        // 如果总页数比连续页码要小
        if(continues+parseInt(continues/2)>=totalPage) {
          start = 1
          end = totalPage
        }else{
          // 如果当前页码＜连续页码（在开头处）
          if(pageNo <= continues) {
            start = 1
            end = continues + parseInt(continues/2) 
            // console.log(111111)
          }else if(pageNo+parseInt(continues/2)>totalPage){
            // 如果当前页码在结尾的临界处
            end = totalPage
            start = totalPage - 2*(parseInt(continues/2))
            // console.log(222222)
          }else{
            // 如果当前页码在中间
            start = pageNo - parseInt(continues/2)
            end = pageNo + parseInt(continues/2)
            // console.log(3333333)
          }
        }
        return {start,end}
      },
      // 将连续页码作为数据存入新数组
      continuesList () {
        let {start,end} = this.StartNumAndEndNum 
        let continueList = []
        for(let i=start;i<end+1;i++){
          continueList.push(start)
          start++
        }
        return continueList
      }
    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #fff;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>