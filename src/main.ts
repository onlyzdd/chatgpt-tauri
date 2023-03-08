import { createApp } from 'vue'
// import 'highlight.js/styles/atom-one-light.css'

import router from './router'
import { pinia } from './store'
import { i18n } from './locales'

import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router).use(pinia).use(i18n)
app.mount('#app')
