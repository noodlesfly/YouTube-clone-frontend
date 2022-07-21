import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { store } from '@/store'
import type { ResUser } from '@/service/types/user'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { createToaster } = require('@meforma/vue-toaster')

// const toaster = createToaster({ /* options */
//   position: 'top'
// })

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  store.state.user && ((config.headers as AxiosRequestHeaders).Authorization = `Bearer ${(store.state.user as ResUser).token}`)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // 对响应错误做点什么
  // const status = error.response.status
  // const msg = error.response.data.error
  // toaster.error(msg)
  return Promise.reject(error.response.data)
})
// axios实例默认不支持泛型，做一层包装
export default <T>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
