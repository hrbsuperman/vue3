import {markRaw,defineAsyncComponent} from 'vue'
import Home from '../views/system/home.vue'


const routers: any = {
    "home": Home,
    "customer": defineAsyncComponent(() => import('@/views/system/login.vue')),
    "Test":defineAsyncComponent(() => import('@/views/example/Form.vue')),


    //Example
    "Form":defineAsyncComponent(() => import('@/views/example/Form.vue')),
    "Table":defineAsyncComponent(() => import('@/views/example/Table.vue')),
    "Dialog":defineAsyncComponent(() => import('@/views/example/Dialog.vue')),
    "403":defineAsyncComponent(() => import('@/views/example/exception/403.vue')),
    "404":defineAsyncComponent(() => import('@/views/example/exception/404.vue')),
    "500":defineAsyncComponent(() => import('@/views/example/exception/500.vue'))
};

export default routers
