// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

// 引入懒加载指令插件并注册
import {lazyPlugin} from "@/directives/index.js";
// 引入全局组件插件
import {componentPlugin} from "@/components/index.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

// 定义全局指令
