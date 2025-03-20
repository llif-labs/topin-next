import {MiddlewareFactory} from '@/middleware/factory/MiddlewareFactory'
import {NextMiddleware, NextResponse} from 'next/server'

export const stackHandler = (
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware => {

  const current = functions[index]

  if (current) {
    const next = stackHandler(functions, index + 1)

    return current(next)
  }

  return () => NextResponse.next()
}

