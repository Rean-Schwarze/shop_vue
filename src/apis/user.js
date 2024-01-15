//封装所有和用户相关的接口函数
import request from '@/utils/http.js'
export const loginAPI=({account,password})=>{
    return request({
        url: '/user/login',
        // url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}
export const registerAPI=({account,password,nickName,receiver,contact,address,email})=>{
    return request({
        url:'/user/register',
        method:'POST',
        data:{
            account,password,nickName,receiver,contact,address,email
        }
    })
}

export const getLikeListAPI = ({ limit = 4 }) => {
    return request({
        url:'/goods/relevant',
        params: {
            limit
        }
    })
}
