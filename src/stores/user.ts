import { defineStore, acceptHMRUpdate } from 'pinia'
import { useJwt } from '@vueuse/integrations/useJwt'
import { login } from '@/api/user-api'
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie-util'
import { mapJWTPayloadToBoardUser } from './helpers/authMapper'
import type { AuthenticationRequest, JWTPayload, BoardUser } from '@/types/authentication'

interface AuthState {
  isLoggedIn: boolean
  user?: BoardUser | null
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    isLoggedIn: !!getCookie('token')
  }),

  actions: {
    async login(credentials: AuthenticationRequest) {
      const { access_token } = await login(credentials)
      const { payload } = useJwt(access_token)
      setCookie('token', access_token)
      this.isLoggedIn = true
      this.user = mapJWTPayloadToBoardUser(payload.value as JWTPayload)
    },
    logout() {
      this.isLoggedIn = false
      deleteCookie('token')
    },
    rehydrateUser() {
      const token = getCookie('token')
      if (token) {
        const { payload } = useJwt(token)
        this.user = mapJWTPayloadToBoardUser(payload.value as JWTPayload)
        this.isLoggedIn = true
      }
    }
  },

  getters: {
    name: (state) => state.user?.name
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
