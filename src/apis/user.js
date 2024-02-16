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
export const registerAPI=({account,phone,password,nickName,receiver,contact,address,email,region})=>{
    return request({
        url:'/user/register',
        method:'POST',
        data:{
            account,phone,password,nickName,receiver,contact,address,email,region
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

export const getAddressAPI=()=>{
    return request({
        url:'/user/address',
        method:'GET'
    })
}

// 上传头像
export const uploadAvatarAPI=(data)=>{
    return request({
        url:'/upload/avatar',
        method:'POST',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
