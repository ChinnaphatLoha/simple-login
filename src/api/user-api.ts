import client from './axios-instance'
import type { AuthenticationResponse } from '@/types/auth-response'

const authEndpoint = '/poc/api/auth'
const loginEndpoint = `${authEndpoint}/login`

export const login = async (credentials: { username: string; password: string }) => {
  return await client.post<AuthenticationResponse>(loginEndpoint, credentials)
}
