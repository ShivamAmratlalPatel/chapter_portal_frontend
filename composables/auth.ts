import type { AuthUser } from '~~/stores/auth'

export function useAuthStorage({ authTokenKey, authUserKey } = {
  authTokenKey: 'auth.token',
  authUserKey: 'auth.user',
}) {
  const user = useCookie<AuthUser>(authUserKey)
  const token = useCookie<string>(authTokenKey)

  const store = (newToken: string, newUser: Record<string, any>) => {
    token.value = newToken
    user.value = <AuthUser>newUser
  }

  const clear = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    user.value = null
    token.value = ''
  }

  return { store, clear, user, token }
}
