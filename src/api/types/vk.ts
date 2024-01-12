export type VkMapUsers = {
    id: VkUser
}
/*
https://dev.vk.com/ru/reference/objects/user#bdate
// D.M.YYYY
 */
export type dateString = string
/*

https://dev.vk.com/ru/reference/objects/user
 */
export type VkUser = {
    id: number,
    first_name: string,
    last_name: string,
    photo_50: URL,
    sex: Sex,
    friends_count?: number,
    sourceFriends?: VkUser[],
    deactivated ?: string,
    bdate ?: dateString
}
/*
https://dev.vk.com/ru/reference/objects/post
 */
export type VkWall = {
    id: number,
    owner_id: number,
    text: string,
    attachments: VkAttachment[]
}
//here more than 1 but for presenting it will be over
export type VkAttachmentType = "photo"
/*
https://dev.vk.com/ru/reference/objects/attachments-wall
*/
export type VkAttachment = {
    type: VkAttachmentType
    photo?:VkPhoto,
}

/*
https://dev.vk.com/ru/reference/objects/photo
 */
export type VkPhoto = {
    id: number,
    text: string,
    date: number, // UnixTime
    sizes: VkPhotoCopy[]
}

export type VkPhotoCopy = {
    type: VkPhotoCopyType,
    url: URL,
    width: number,
    height: number
}
/*
 https://dev.vk.com/ru/reference/objects/photo-sizes
 */
export type VkPhotoCopyType = "s" | "m" | "x" | "o" | "p" | "q" | "r" | "y" | "z" | "w"

export enum Sex {
    unknown = 0,
    female = 1,
    male = 2,
}

export type URL = string