import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useUserStore } from './stores/user';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Rehydrate the user on app load
const userStore = useUserStore()
userStore.rehydrateUser()

app.mount('#app')
