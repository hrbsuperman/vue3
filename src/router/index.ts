import {defineAsyncComponent} from 'vue'
import Home from '../views/system/home.vue'


const routers: any = {
    "": Home,
    "home": Home,
    "customer": defineAsyncComponent(() => import('@/views/system/login.vue'))
};

export default routers
