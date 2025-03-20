import {NextRequest, NextResponse} from 'next/server'
import {setLoginSession} from '@/core/util/SessionUtil'

// 환경 변수 및 설정
const config = {
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  COOKIE_MAX_AGE: 15552000, // 6개월
  AUTH_WHITELIST: ['auth/login', 'auth/register'],
  REQUEST_TIMEOUT: 10000, // 10초 타임아웃
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {

  const pathname = req.nextUrl.pathname

  try {

    const response: { code: number, payload: T } = {
      code: 200,
      payload: {
        role: 101,
        username: 'ngyu00',
        token: {
          accessToken: '12312312',
          refreshToken: 'string,',
        },
      },
    }

    // 응답 생성
    const nextRes = new NextResponse(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (pathname.includes('login')) {
      await setLoginSession(true, response.payload)
    }

    // return nextRes

    return nextRes
  } catch (error: any) {
    const status = error.response?.status || 500
    const message = error.response?.data || {message: '프록시 오류'}

    // 에러 로깅
    console.error(`[${new Date().toISOString()}] ❌ 프록시 에러 [${status}]:`, message)

    return NextResponse.json(message, {status})
  }
}

// 다른 메서드 지원
export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return POST(req, context) // 동일한 로직 재사용
}
