//封装所有和用户相关的接口函数
import request from '@/utils/http.js'
export const loginAPI=({account,password})=>{
    return request({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}
export const registreAPI=({account,password,nickName,reciver,contact,address})=>{
    return request({
        url:'/register',
        method:'POST',
        data:{
            account,password,nickName,reciver,contact,address
        }

    })
}
