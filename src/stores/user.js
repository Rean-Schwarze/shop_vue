// 管理用户数据相关

import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI, uploadAvatarAPI} from "@/apis/user.js";
import {useCartStore} from "@/stores/cartStore.js";
import {mergeCartAPI} from "@/apis/cart.js";
import {modifyBasicInfoAPI} from '@/apis/user.js';
import { ElMessage } from 'element-plus'

export const useUserStore=defineStore('user',()=>{
    const cartStore=useCartStore()
    //1. 定义管理用户数据的state
    const userInfo=ref({})
    //2. 定义获取接口数据的action函数
    const getUserInfo=async ({account, password})=>{
        const res=await loginAPI({account,password})
        if(res.result!=null){
            userInfo.value=res.result
            // 合并购物车
            await mergeCartAPI(cartStore.cartList.map(item=>{
                return{
                    skuId:item.skuId,
                    selected:item.selected,
                    count:item.count
                }
            }))
            await cartStore.updateNewList()
        }
        else {
            ElMessage({
                type:'warning',
                message:res.message
            })
        }
    }
    //4. 退出时清除用户信息+购物车信息
    const clearUserInfo=()=>{
        userInfo.value={}
        cartStore.clearCart()
    }
    // 上传头像
    const uploadAvatar=async (formData)=>{
        const res=await uploadAvatarAPI(formData);
        if(res.code===1){
            ElMessage.success("上传成功！")
            userInfo.value.avatar=res.result.url
        }
        else{
            ElMessage.error(res.message)
        }
    }
    // 修改用户基本信息
    const modifyUserBasicInfo=async ({account,nickname})=>{
        const res=await modifyBasicInfoAPI({account,nickname})
        if (res.code===1){
            userInfo.value.account=account
            userInfo.value.nickname=nickname
            ElMessage.success(res.message)
        }
        else{
            ElMessage.error(res.message)
        }
    }
    //3. 以对象的格式把state和action返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
        modifyUserBasicInfo,
        uploadAvatar
    }
},{
    persist:true,
    })
