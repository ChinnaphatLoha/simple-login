import client from './axios-instance'
import type { AuthenticationRequest, AuthenticationResponse } from '@/types/authentication'

const authEndpoint = '/poc/api/auth'
const loginEndpoint = `${authEndpoint}/login`

export const login = async (credentials: AuthenticationRequest) => {
  const res = await client.post<AuthenticationResponse>(loginEndpoint, credentials)
  return res.data
}
