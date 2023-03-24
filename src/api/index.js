// 将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark'
import * as spu from './product/spu'
import * as sku from './product/sku'
import * as attr from './product/attr'
import * as user from './acl/user'
//###1 由于role、permission都是默认暴露，所以引入的时候要给它起一个名字
import  role from './acl/role'
import  permission from './acl/permission'

// 对外暴露 
export default {
    trademark,
    spu,
    sku,
    attr,
    user,
    role,
    permission
}