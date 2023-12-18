// 封封装购物车模块
import {defineStore} from "pinia";
import {ref,computed} from "vue";
import {useUserStore} from "@/stores/user.js";
import {insertCartAPI,findNewCartListAPI,delCartAPI} from "@/apis/cart.js";


export const useCartStore = defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)
    //1. 定义state - cartList
    const cartList=ref([])
    // 获取最新购物车列表action
    const updateNewList=async ()=>{
        const res=await findNewCartListAPI()
        cartList.value=res.result
    }
    //2. 定义action - addCart
    const addCart=async (goods)=>{
        const {id,skuId,count}=goods
        if (isLogin.value)
        {
            // 已登录的加入购物车逻辑
            await insertCartAPI({id,skuId,count})
            const res=await findNewCartListAPI()
            cartList.value=res.result
        }
        else{
            // 已添加，count+1，否则push（通过匹配skuId是否在cartList）
            const item=cartList.value.find((item)=>goods.skuId===item.skuId)
            if(item){
                item.count++
            }
            else{
                cartList.value.push(goods)
            }
        }
    }
    // 删除
    const delCart=async (skuId)=>{
        if (isLogin.value){
            await delCartAPI([skuId])
            const res=await findNewCartListAPI()
            cartList.value=res.result
        }
        else{
            //splice/filter
            const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
            cartList.value.splice(idx,1)
        }
    }
    // 清除购物车
    const clearCart=()=>{
        cartList.value=[]
    }
    // 计算属性（数量、价格）
    const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 4. 已选择商品的价格总和
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    // 单选功能的action
    const singleCheck=(skuId,selected)=>{
        // 通过skuId找到修改的那项，修改selected
        const item=cartList.value.find((item)=>item.skuId===skuId)
        item.selected=selected
    }
    // 是否全选
    const isAll=computed(()=>cartList?.value.every((item)=>item.selected))
    // 全选功能
    const allCheck=(selected)=>{
        cartList.value.forEach(item=>item.selected=selected)
    }
    return {
        cartList,
        addCart,
        delCart,
        clearCart,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        singleCheck,
        isAll,
        allCheck,
        updateNewList
    }
},{
    persist:true,
})
