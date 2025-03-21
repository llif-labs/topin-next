export interface SessionAutUser {
  id?: number
  role?: number
  username?: string
  email?: string
  token?: {
    accessToken?: string
    refreshToken?: string
  }
}


export interface SessionAuth {
  isLoggedIn: boolean
  user?: SessionAutUser
}
