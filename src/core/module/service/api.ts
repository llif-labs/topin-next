import axios, {AxiosRequestConfig} from 'axios'
import {Req, Res} from '@/core/module/service/apiInterface'


// API 클래스
class APIClass {
  private static instance: APIClass

  private constructor() {
  }

  private static get(): APIClass {
    if (!APIClass.instance) {
      APIClass.instance = new APIClass()
    }
    return APIClass.instance
  }

  private baseHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    }
  }

  private config(req: Req): AxiosRequestConfig {
    const cfg: AxiosRequestConfig = {
      method: req.method,
      url: req.url,
      headers: {...this.baseHeaders(), ...req.headers},
    }

    this.setParams(cfg, req)
    return cfg
  }

  private setParams(cfg: AxiosRequestConfig, req: Req): void {
    if (!req.params) return

    switch (req.method.toLowerCase()) {
      case 'get':
        cfg.params = req.params
        break
      case 'post':
      case 'put':
      case 'patch':
      case 'delete':
        cfg.data = req.params
        break
      default:
        throw new Error(`Unsupported method: ${req.method}`)
    }
  }

  async call<T = unknown>(req: Req): Promise<Res<T>> {
    try {
      const cfg = this.config(req)
      // throw new Error('test')

      return (await axios(cfg)).data
    } catch (error: any) {
      throw error
    }
  }

  // API 객체로 노출
  public static API = {
    call: <T = unknown>(req: Req) => APIClass.get().call<T>(req),
  }
}

const API = APIClass.API

export default API

// 사용 예시:
/*
async function test() {
  const req: Req = {
    method: 'post',
    url: 'https://api.example.com/data',
    params: { id: 1, name: 'test' },
    headers: { 'Authorization': 'Bearer token123' }
  };

  try {
    const res = await API.call<{ id: number; name: string }>(req);

  } catch (error) {
    console.error(error);
  }
}
*/
