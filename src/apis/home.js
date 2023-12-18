import http from '@/utils/http.js'

// 获取banner
export function getBannerAPI(params={}){
    // 默认为1 商品为2
    const {distributionSite='1'}=params
    return http({
        url:'home/banner',
        params:{
            distributionSite
        }
    })
}

// 获取新鲜好物
export const findNewAPI = (params={}) => {
    const {limit=4}=params
    return http({
        url:'/home/new',
        params:{
            limit
        }
    })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
    return  http({
        url:'/home/hot'
    })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
    return http({
        url: '/home/goods'
    })
}
