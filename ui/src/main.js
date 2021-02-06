import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/base.css'
import Button from '@/components/base/Button.vue'
import Card from '@/components/base/Card.vue'

const app = createApp(App)

app.use(store).use(router)

app.component('Card', Card).component('Button', Button)

app.mount('#app')
