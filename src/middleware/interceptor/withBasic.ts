import {NextFetchEvent, NextRequest} from 'next/server'
import {createSession} from '@/core/util/SessionUtil'
import {MiddlewareFactory} from '@/middleware/factory/MiddlewareFactory'

export const withBasic: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await createSession()

    return next(request, _next)
  }
}
