import type { JWTPayload, BoardUser } from '@/types/authentication'

export const mapJWTPayloadToBoardUser = (payload: JWTPayload): BoardUser | null => {
  const { role, name, email, oid, sub } = payload

  // Validate role
  if (!['LECTURER', 'STAFF', 'STUDENT'].includes(role)) {
    return null // Role is not valid
  }

  // Validate name format
  const nameParts = name.split(' ')
  if (nameParts.length !== 2) {
    return null // Name is not in the "First Last" format
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    return null // Email is not in the correct format
  }

  // Map to BoardUser
  const boardUser: BoardUser = {
    id: oid as `${string}-${string}-${string}-${string}-${string}`, // Assuming oid is in the correct format
    username: sub,
    name: name as `${string} ${string}`,
    email: email as `${string}@${string}`,
    role: role as 'LECTURER' | 'STAFF' | 'STUDENT'
  }

  return boardUser
}
