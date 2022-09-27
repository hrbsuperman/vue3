import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/system/home.vue'
// import routes from './routes'


const router = createRouter({
    history: createWebHistory(),
    routes:
        [
            {
                path: '/',
                component: () => import('../views/_layout/index.vue'),
                children: [

                    {
                        path: '/',
                        component: Home
                    },
                    {
                        path: '/home',
                        name: 'home',
                        component: Home
                    },
                    {
                        path: '/test',
                        name: 'test',
                        component: () => import('../views/example/Form.vue')
                    },
                    {
                        path: '/example/form',
                        name: 'ExampleForm',
                        component: () => import('../views/example/Form.vue')
                    }
                ]
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/system/login.vue')
            }
        ]
})


// router.beforeEach(async (to, _, next) => {
//     //获取 token
//     const token = '';
//     if (token) {
//         if (to.name == "login") {
//             //如果已登陆，跳转到HOME页
//             next({ path: "/home" });
//         } else {
//             next();
//         }
//     } else {
//         switch (to.name){
//             case 'login':
//             case 'ExampleForm':
//                 next();
//                 break;
//             default:
//             next({ name: "login" });
//                 break;
//         }
//     }
//
// });

export default router
