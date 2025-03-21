type LowerMethod ='get' | 'post' | 'put' | 'patch' | 'delete'
type UpperMethod =  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type Method =  LowerMethod | UpperMethod;

// 요청 파라미터 타입
interface Params {
  [key: string]: string | number | boolean | undefined | null;
}

// 요청 설정 타입
export interface Req {
  method: Method;
  url: string;
  params?: Params;
  headers?: Record<string, string>;
}

// 응답 타입
// export interface Res<T> {
//   data: {
//     message: string
//     payload: T
//   };
//   status: number;
//   statusText: string;
//   headers: Record<string, string>;
//   config: AxiosRequestConfig;
// }
// 응답 타입
export interface Res<T> {
  message: string
  payload: T
}
