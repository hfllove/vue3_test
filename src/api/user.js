import request from '@/utils/request'

// 用户登录的请求
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

// 获取用户信息的请求
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 用户退出登录的请求
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
