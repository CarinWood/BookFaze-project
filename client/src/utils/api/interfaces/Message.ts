export interface CreateMessage  {
    message: string
    username: string 
    image: string  
}

export interface ReadMessage {
    _id: string,
    message: string,
    username: string,
    image: string
    createdAt: Date,
    updatedAt: Date
}