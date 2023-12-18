// 封装购物车相关接口
import request from '@/utils/http.js'

// 加入购物车
export const insertCartAPI=({id,skuId,count})=>{
    return request({
        url:'/member/cart',
        method:'POST',
        data:{
            id,
            skuId,
            count
        }
    })
}

// 获取购物车列表
export const findNewCartListAPI=()=>{
    return request({
        url:'/member/cartlist'
    })
}

// 删除购物车
export const delCartAPI=(ids)=>{
    return request({
        url:'/member/cart/delete',
        method:'DELETE',
        data:{
            ids
        }
    })
}

// 合并购物车
export const mergeCartAPI=(data)=>{
    return request({
        url:'/member/cart/merge',
        method:'POST',
        data
    })
}
