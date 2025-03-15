import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isAdmin = () => {
  // Placeholder; replace with real authentication logic (e.g., check cookies or token)
  return true
}

export const middleware = (request: NextRequest) => {

  if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin()) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
