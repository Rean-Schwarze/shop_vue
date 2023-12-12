// 封封装购物车模块
import {defineStore} from "pinia";
import {ref,computed} from "vue";

export const useCartStore = defineStore('cart',()=>{
    //1. 定义state - cartList
    const cartList=ref([])
    //2. 定义action - addCart
    const addCart=(goods)=>{
        // 已添加，count+1，否则push（通过匹配skuId是否在cartList）
        const item=cartList.value.find((item)=>goods.skuId===item.skuId)
        if(item){
            item.count++
        }
        else{
            cartList.value.push(goods)
        }
    }
    // 删除
    const delCart=(skuId)=>{
        //splice/filter
        const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice(idx,1)
    }
    // 计算属性（数量、价格）
    const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
},{
    persist:true,
})
