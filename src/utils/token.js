// 存储token
export const setToken = (data)=> localStorage.setItem('TOKEN',data)
// 获取token
export const getToken = () => localStorage.getItem('TOKEN') 
// 清除本地存储的token
export const removeToken = () => localStorage.removeItem('TOKEN')