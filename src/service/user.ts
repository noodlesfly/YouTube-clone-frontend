import request from '@/utils/request'
import { ReqLogin, ResLogin } from '@/service/types/user'

export const login = (data: ReqLogin) => {
  return request<ResLogin>({
    method: 'POST',
    url: '/api/v1/users/login',
    data
  })
}
