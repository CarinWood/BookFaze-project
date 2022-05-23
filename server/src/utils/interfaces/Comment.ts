export interface CreateComment {
    text: string
    name: string
    messagekey: string
    image: string
}

export interface ReadComment {
    _id: string
    text: string
    name: string
    messagekey: string
    image: string
    createdAt: Date
    updatedAt: Date
}