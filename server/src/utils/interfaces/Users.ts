export interface CreateUser {
    username: string
    password: string
    active: boolean
    image: string
}


export interface ReadUser {
    _id: string
    username: string
    password: string
    email: string
    image: string
    active: boolean
    createdAt: Date
    updatedAt: Date

}