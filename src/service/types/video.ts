export interface ReqCreateVideo {
    title: string,
    description: string,
    cover?: string,
    vodVideoId:string,
}
export interface Video {
    commentsCount: number,
    dislikesCount: number,
    'likesCount': number,
    'viewsCount': number,
    '_id': string,
    'title': string,
    'description':string,
    'cover': string,
    'vodVideoId': string,
    'user': string,
    'createdAt': string,
    'updatedAt': string,
    '__v': 0
}

export interface ResCreateVideo {
    video: Video
}
