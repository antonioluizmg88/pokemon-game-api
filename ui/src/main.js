import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import './assets/tailwind.css'
import './assets/base.css'
import Button from '@/components/base/Button.vue'
import Card from '@/components/base/Card.vue'
import Input from '@/components/base/Input.vue'
import Dropdown from '@/components/base/Dropdown.vue'
import List from '@/components/base/List.vue'

const app = createApp(App)

app.use(store).use(router)

app
  .component('Card', Card)
  .component('Button', Button)
  .component('Input', Input)
  .component('Dropdown', Dropdown)
  .component('List', List)

app.mount('#app')
