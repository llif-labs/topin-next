import {MiddlewareFactory} from '@/middleware/factory/MiddlewareFactory'
import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {decryptOnMiddleware} from '@/core/util/SessionUtil'
import {SessionAuth} from '@/core/common/interface/session'

export const withAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    if(["/admin/content"]?.some((path) => pathname.startsWith(path))) {
      const session: SessionAuth = await decryptOnMiddleware()

      if(!session.isLoggedIn ||
        (session.user && session.user.role && session.user?.role <= 100)
      ) {
        const loginUrl = new URL('/admin/auth/login', request.url)
        return NextResponse.redirect(loginUrl)
      }
    }
    if(["/admin/auth"]?.some((path) => pathname.startsWith(path))) {
      const session: SessionAuth = await decryptOnMiddleware()

      if(session.isLoggedIn || (session.user && session.user.role && session.user?.role >= 100)) {
        const loginUrl = new URL('/admin/content/dashboard', request.url)
        return NextResponse.redirect(loginUrl)
      }
    }

    return next(request, _next)
  }
}
