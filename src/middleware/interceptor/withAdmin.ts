import {MiddlewareFactory} from '@/middleware/factory/MiddlewareFactory'
import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {decryptOnMiddleware} from '@/core/util/SessionUtil'
import {SessionAuth} from '@/core/common/interface/session'
import ValueUtil from '@/core/util/ValueUtil'

export const withAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname
    const session: SessionAuth = await decryptOnMiddleware()
    const isLoggedIn = session.isLoggedIn
    const userRole = session.user?.role || 0

    // /admin/content 관련 경로에 대한 접근 제어
    if (pathname.startsWith("/admin/content")) {
      if (!isLoggedIn || userRole <= ValueUtil.IS_ADMIN) {
        const loginUrl = new URL('/admin/auth/login', request.url)
        return NextResponse.redirect(loginUrl)
      }
    }

    // /admin/auth 관련 경로에 대한 접근 제어
    if (pathname.startsWith("/admin/auth")) {
      if (isLoggedIn && userRole >= ValueUtil.IS_ADMIN) {
        const dashboardUrl = new URL('/admin/content/dashboard', request.url)
        return NextResponse.redirect(dashboardUrl)
      }
    }

    // 권한에 맞는 요청을 통과시킴
    return next(request, _next)
  }
}
