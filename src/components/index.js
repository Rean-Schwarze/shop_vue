// 把components中所有组件全局化注册（通过插件的方式）

import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin={
    install(app){
        app.component('ImageView',ImageView)
        app.component('Sku',Sku)
    }
}
