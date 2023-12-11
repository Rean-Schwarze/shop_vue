// 封装 分类数据 相关业务代码

import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getCategoryAPI} from "@/apis/category.js";

export function useCategory(){
    const categoryData=ref({})
// 获取路由参数
    const route=useRoute()
    const getCategory=async (id=route.params.id)=>{
        const res=await getCategoryAPI(id)
        categoryData.value=res.result
    }
    onMounted(()=>getCategory())

// 路由参数变化时，分类数据接口重新发送
    onBeforeRouteUpdate((to)=>{
        // 传了参数，以最新的为准
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}
