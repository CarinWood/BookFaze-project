export interface CreateUser  {
    username: string
    password: string
    active: boolean
    image: string
}

export interface ReadUser {
    _id: string
    username: string
    password: string
    active: boolean
    image: string
    createdAt: Date
    updatedAt: Date
    
}