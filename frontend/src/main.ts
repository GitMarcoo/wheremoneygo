import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.css'
import '@/assets/styles/tailwind.css'
import 'flowbite/dist/flowbite.min.css'
import '../node_modules/flowbite/dist/flowbite.min.js'

createApp(App).use(store).use(router).mount('#app')
