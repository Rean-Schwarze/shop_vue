import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import Register from '@/views/Register/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Chechout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from "@/views/Member/components/UserOrder.vue";
import UserConfig from '@/views/Member/components/UserConfig.vue';
import UserAddress from "@/views/Member/components/UserAddress.vue";
import UserSecurity from "@/views/Member/components/UserSecurity.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      component:Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'detail/:id',
          component:Detail
        },
        {
          path:'cartlist',
          component:CartList
        },
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:PayBack
        },
        {
          path:'member',
          component:Member,
          children:[
            {
              path:'user',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            },
            {
              path:'config',
              component:UserConfig
            },
            {
              path:'address',
              component:UserAddress
            },
            {
              path:'security',
              component:UserSecurity
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ],
  // 路由滚动行为定制
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
