export const getCookie = (name: string): string | null => {
  const cookieName = `${encodeURIComponent(name)}=`
  const cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue: string | null = null

  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    )
  }

  return cookieValue
}

export const setCookie = (name: string, value: string, days: number = 0.02): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

export const deleteCookie = (name: string): void => {
  document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}
