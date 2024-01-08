// 管理用户数据相关

import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "@/apis/user.js";
import {useCartStore} from "@/stores/cartStore.js";
import {mergeCartAPI} from "@/apis/cart.js";
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
    //3. 以对象的格式把state和action返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true,
    })
