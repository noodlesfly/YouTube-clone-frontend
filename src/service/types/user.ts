export interface ReqLogin {
    email: string
    password: string
}
export interface ResUser {
    userName:string,
    email: string,
    token: string,
    avatar?: string,
    channelDescription?: string
}

export interface ResLogin {
    user: ResUser
}
