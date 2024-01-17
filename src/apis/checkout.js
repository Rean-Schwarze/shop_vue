
import request from "@/utils/http.js";

// 获取详情接口
export const getCheckInfoAPI=(data)=>{
    // console.log(data)
    return request({
        url:'/member/order/pre',
        method:'POST',
        data
    })
}

// 创建订单
export const createOrderAPI=(data)=>{
    return request({
        url:'/member/order',
        method:'POST',
        data
    })
}
