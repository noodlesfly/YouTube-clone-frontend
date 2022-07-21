import request from '@/utils/request'
import { ReqCreateUploadVideo, ResUploadVideo, ReqRefreshUploadVideo, ResVideoAuth } from '@/service/types/vod'

export const createUploadVideo = (params: ReqCreateUploadVideo) => {
  return request<ResUploadVideo>({
    method: 'GET',
    url: '/api/v1/vod/CreateUploadVideo',
    params
  })
}

export const refreshUploadVideo = (params: ReqRefreshUploadVideo) => {
  return request<ResUploadVideo>({
    method: 'GET',
    url: '/api/v1/vod/CreateUploadVideo',
    params
  })
}

export const getUploadAuth = (vodVideoId: string) => {
  return request<ResVideoAuth>({
    method: 'GET',
    url: '/api/v1/vod/getUploadAuth',
    params: {
      VideoId: vodVideoId
    }
  })
}
