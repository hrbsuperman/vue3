import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.less'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
await router.isReady();
app.mount('#app')
