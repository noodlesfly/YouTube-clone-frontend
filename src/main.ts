import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import './styles/main.scss'
import 'nprogress/nprogress.css'

createApp(App).use(store, key).use(router as any).mount('#app')
