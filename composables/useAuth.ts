import { GqlLoginUser } from '#gql'

export const useAuth = () => {
  const token = useCookie('auth_token')
  const isAuthenticated = useState('isAuthenticated', () => false)

  const setToken = (newToken: string) => {
    token.value = newToken
    isAuthenticated.value = true
    const { $graphql } = useNuxtApp()
    $graphql.default.setHeader('Authorization', `Bearer ${newToken}`)
  }

  const clearToken = () => {
    token.value = null
    isAuthenticated.value = false
    const { $graphql } = useNuxtApp()
    $graphql.default.setHeader('Authorization', '')
  }

  const getToken = () => {
    return token.value
  }

  return {
    token,
    isAuthenticated,
    setToken,
    getToken,
    clearToken
  }
}

export const useLogin = async (email: string, password: string) => {
	// const { setToken } = useAuth()
  try {
    // const { GqlLoginUser } = await useGql()
    // const  GqlInstance = await useGql()    
    const login = await GqlLoginUser({ email, password })
    
    if (login) {
      // setToken(login.login)
      return true
    }
    return false
  } catch (error) {
    console.error('Login failed:', error)
    return false
  }
}