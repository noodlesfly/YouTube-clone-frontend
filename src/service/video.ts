import request from '@/utils/request'
import { ReqCreateVideo, ResCreateVideo } from '@/service/types/video'

export const createVideo = (data:ReqCreateVideo) => {
  return request<ResCreateVideo>({
    method: 'POST',
    url: '/api/v1/videos',
    data
  })
}

export const getVideo = (id: string) => {
  return request({
    method: 'GET',
    url: `/api/v1/videos/${id}`
  })
}
