import {NextRequest, NextResponse} from 'next/server'
import {decryptOnMiddleware, SESSION_SETTING, setLoginSession} from '@/core/util/SessionUtil'
import axios, {AxiosResponse} from 'axios'
import ValueUtil from '@/core/util/ValueUtil'
import {getIronSession} from 'iron-session'
import {SessionAuth} from '@/core/common/interface/session'
import {cookies} from 'next/headers'

// axios.defaults.withCredentials = true

// 환경 변수 및 설정
const config = {
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8001/api',
  COOKIE_MAX_AGE: 15552000, // 6개월
  AUTH_WHITELIST: [
    'auth/login',
    'auth/verifyEmail',
    'auth/register',
  ],
  REQUEST_TIMEOUT: 10000, // 10초 타임아웃
}

const filterPath = (
  accessToken: string | undefined,
  refreshToken: string | undefined,
  path: string[],
): boolean => {
  const pathStr = path.join('/')
  return config.AUTH_WHITELIST.includes(pathStr) ? false : (!accessToken && !refreshToken)
}

async function handleRequestBody(req: NextRequest) {
  const contentType = req.headers.get('Content-Type') || ValueUtil.DEFAULT_STRING

  if (contentType.includes('multipart/form-data')) {
    // FormData를 직접 처리
    const formData = await req.formData()
    return formData // FormData 객체를 그대로 반환
  } else if (contentType.includes('application/json')) {
    return await req.json() // JSON일 경우만 파싱
  }
  return undefined // 그 외의 경우
}

const saveUser = async (req: NextRequest, response: AxiosResponse<any, any>, nextRes: NextResponse) => {
  const pathname = req.nextUrl.pathname
  const referrer = req.headers.get('referer') || ValueUtil.DEFAULT_STRING

  // 로그인 url이 아니면 그냥 넘기고,
  if (!pathname.includes('login') && !pathname.includes('verifyEmail')) return


  // admin 이 로그인하는건지 확인하자
  if (referrer.includes('/admin')) {
    // 어드민 로그인은 이메일 인증해야함.. 이메일 인증 완료되면 user 정보내려줌..
    if (pathname.includes('verifyEmail')) {
      if (response.data.payload.role > ValueUtil.IS_ADMIN) {
        await setLoginSession(true, response.data.payload)
        nextRes.headers.set('Set-Cookie', 't.auth.sid=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict')
      }
    }
  } else {
    await setLoginSession(true, response.data.payload)
  }

}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const {path} = await context.params
  const resolvedPath = path || []


  const url = `${config.API_ENDPOINT}/${resolvedPath.join('/')}`
  const session = await decryptOnMiddleware()

  if (filterPath(session.user?.token?.accessToken, session.user?.token?.accessToken, resolvedPath)) {
    return NextResponse.json({message: '인증되지 않음'}, {status: 401})
  }

  try {
    const requestBody = req.method !== 'GET' && req.method !== 'HEAD' ? await handleRequestBody(req) : undefined

    const response = await axios({
      url,
      method: req.method,
      headers: {
        ...Object.fromEntries(req.headers.entries()), // 나머지 모든 헤더를 추가
        'Content-Type': req.headers.get('Content-Type') || 'application/json',
        Authorization: session?.user?.token?.accessToken ? `Bearer ${session.user.token.accessToken}` : undefined,
        'Refresh-Token': session?.user?.token?.refreshToken || undefined,
      },
      data: requestBody,
      timeout: config.REQUEST_TIMEOUT,
    })


    const nextRes = new NextResponse(JSON.stringify(response.data), {status: response.status})

    Object.entries(response.headers).forEach(([key, value]) => {
      nextRes.headers.set(key, value as string)
    })

    // `Content-Type` 추가
    nextRes.headers.set('Content-Type', 'application/json')

    await saveUser(req, response, nextRes)


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


// 다른 메서드 지원
export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {

  if (req.nextUrl.pathname.includes('logout')) {
    const session = await getIronSession<SessionAuth>(await cookies(), SESSION_SETTING);
    session.destroy()

    return NextResponse.json({ message: '로그아웃에 성공하였습니다.' }, { status: 200 });
  }

  return POST(req, context) // 동일한 로직 재사용
}
