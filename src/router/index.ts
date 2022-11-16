import {markRaw,defineAsyncComponent} from 'vue'
import Home from '../views/system/home.vue'


const routers: any = {
    "home": Home,                                                                                      /*home*/
    "customer": defineAsyncComponent(() => import('@/views/system/login.vue')),                 /**/
    "Test":defineAsyncComponent(() => import('@/views/example/Table.vue')),                     /**/


    //Example
    "Form":defineAsyncComponent(() => import('@/views/example/Form.vue')),                      /*表单*/
    "Table":defineAsyncComponent(() => import('@/views/example/Table.vue')),                    /*Table*/
    "FlexGrid":defineAsyncComponent(() => import('@/views/example/FlexGrid.vue')),              /*FlexGrid*/
    "StyleComponent":defineAsyncComponent(() => import('@/views/example/StyleComponent.vue')),  /*样式*/
    "FontIcon":defineAsyncComponent(() => import('@/views/example/FontIcon.vue')),              /*字体图标*/
    "Dialog":defineAsyncComponent(() => import('@/views/example/Dialog.vue')),                  /*模态*/
    "403":defineAsyncComponent(() => import('@/views/example/exception/403.vue')),              /*403*/
    "404":defineAsyncComponent(() => import('@/views/example/exception/404.vue')),              /*404*/
    "500":defineAsyncComponent(() => import('@/views/example/exception/500.vue'))               /*500*/
};

export default routers
