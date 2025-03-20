export interface SessionAutUser {
  role?: number
  username?: string
  token?: {
    accessToken?: string
    refreshToken?: string
  }
}


export interface SessionAuth {
  isLoggedIn: boolean
  user?: SessionAutUser
}
