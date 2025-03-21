import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {createSession} from '@/core/util/SessionUtil'
import {MiddlewareFactory} from '@/middleware/factory/MiddlewareFactory'

export const withBasic: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const session = await createSession()

    const response = NextResponse.next()
    if (session.isLoggedIn !== undefined) {
      const cookieHeader = request.headers.get('cookie') || ''
      response.headers.set('Set-Cookie', cookieHeader)
    }

    return next(request, _next)
  }
}
