import {cookies} from 'next/headers'
import {getIronSession} from 'iron-session'
import {SessionAuth, SessionAutUser} from '@/core/common/interface/session'

export const SESSION_SETTING = {
  cookieName: 'tinsid',
  password: process.env.NEXT_SESSION_SECRET || '', // 비밀번호는 필수
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  },
}

// 기본 세션 생성 함수
export const createSession = async (): Promise<SessionAuth> => {

  const cookieStore = await cookies();
  const session = await getIronSession<SessionAuth>(cookieStore, SESSION_SETTING);

  if (session.isLoggedIn === undefined) {
    session.isLoggedIn = false;
    await session.save();
  }

  return session;
};

// 로그인 후 세션에 값 저장하는 함수
export const setLoginSession = async (isLoggedIn: boolean, user: SessionAutUser): Promise<void> => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionAuth>(cookieStore, SESSION_SETTING);

  // 로그인 상태와 유저 정보를 세션에 저장
  session.isLoggedIn = isLoggedIn;
  session.user = user;  // 여기에 user 정보를 설정할 수 있습니다.

  // 세션 저장
  await session.save();
};

export const decryptOnMiddleware = async () => {
  const cookieStore = await cookies()
  const session: SessionAuth = await getIronSession<SessionAuth>(cookieStore, SESSION_SETTING)

  return session
}
