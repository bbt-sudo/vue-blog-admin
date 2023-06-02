import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'
// import './assets/css/element/index.scss'
import i18n from './locale/index'

createApp(App).use(router).use(pinia).use(i18n).mount('#app')
