import { createApp } from 'vue'
import './assets/main.less'
import axios from 'axios'
import { createPinia } from 'pinia'
import App from './App.vue'



const app = createApp(App);

const request = axios.create({
  // API 请求的默认前缀
  baseURL: '',
  withCredentials: true,
  timeout: 30000 // 请求超时时间
})

app.use(createPinia())
app.mount('#app');
//app.use(router)
// app.config.errorHandler = (err) => {
//   /* 处理错误 */
// }
// router.isReady().then(()=>{
//     app.mount('#app')
// })
//
//
