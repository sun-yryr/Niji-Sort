export interface Channel {
    channelId: string
    title: string
    description: string
    thumbnailUrl: string
    publishedAt: string
    viewCount: number
    subscriberCount: number
    videoCount: number
    groupName: string
}

export interface Video {
    id: string
    channelId: string
    title: string
    thumbnailUrl: string
    publishedAt: string
    likeCount: number
    dislikeCount: number
    viewCount: number
    commentCount: number
    likeCountRate: number
    groupName: string
}
