export interface ReqCreateUploadVideo {
    Title:string,
    FileName:string
}

export interface ResUploadVideo {
    VideoId:string,
    UploadAddress:string,
    RequestId: string,
    UploadAuth: string
}

export interface ReqRefreshUploadVideo {
    VideoId:string
}

export interface VideoMeta {
    'Status':string,
    'VideoId':string,
    'Title':string,
    'Duration': string,
    'CoverURL': string
}

export interface ResVideoAuth {
  'PlayAuth': string,
  'VideoMeta': VideoMeta
  'RequestId': string
}
