import { defineStore, acceptHMRUpdate } from 'pinia'
import { login } from '@/api/user-api'
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie-util'

interface UserState {
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: !!getCookie('token')
  }),
  actions: {
    async login(username: string, password: string) {
      const { data } = await login({ username, password })
      this.isLoggedIn = true
      setCookie('token', data.access_token)
    },
    logout() {
      this.isLoggedIn = false
      deleteCookie('token')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
