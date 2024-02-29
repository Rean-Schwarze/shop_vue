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
export const registerAPI=({account,phone,password,nickName,email})=>{
    return request({
        url:'/user/register',
        method:'POST',
        data:{
            account,phone,password,nickName,email
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

//  修改用户基本信息
export const modifyBasicInfoAPI=({account,nickname})=>{
    return request({
        url:'/user/modify/basic',
        method:'POST',
        data:{
            account,
            nickname
        }
    })
}

// 添加收货地址
export const addAddressAPI=({receiver,contact,region,address,isDefault})=>{
    return request({
        url:'/user/address',
        method:'POST',
        data:{
            receiver,
            contact,
            region,
            address,
            isDefault
        }
    })
}

// 修改收货地址
export const modifyAddressAPI=({receiver,contact,region,address,isDefault,id})=>{
    return request(({
        url:'/user/modify/address',
        method:'POST',
        data:{
            receiver,
            contact,
            region,
            address,
            isDefault,
            id
        }
    }))
}