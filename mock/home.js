//###1 引入模拟数据
const data = require('./data.json')
module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
