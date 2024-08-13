import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginForm from '@/components/forms/LoginForm.vue'
import WelcomeView from '@/views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    console.log('Not logged in, redirecting to login')
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
