import { defineStore, acceptHMRUpdate } from 'pinia'
import { login } from '@/api/user-api'

interface UserState {
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: !!localStorage.getItem('token')
  }),
  actions: {
    async login(username: string, password: string) {
      const { data } = await login({ username, password })
      this.isLoggedIn = true
      localStorage.setItem('token', data.access_token)
    },
    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('token')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
