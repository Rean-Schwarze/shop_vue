import request from '@/utils/http.js'


export const getUserOrder = (params) => {
    /*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
    return request({
        url:'/member/order',
        method:'GET',
        params
    })
}
