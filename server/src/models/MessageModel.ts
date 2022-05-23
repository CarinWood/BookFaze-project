import dotenv from 'dotenv'
import { model, Schema } from 'mongoose'
import { CreateMessage } from '../utils/interfaces/Message'

dotenv.config()

const dbCollection = process.env.MONGODB_COLLECTION_MESSAGE

const MessageSchema = new Schema<CreateMessage>({
    message: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    image: {
        type: String,
        reuired: true
    }
    
}, {timestamps: true}

)

const MessageModel = model<CreateMessage>(dbCollection, MessageSchema)

export default MessageModel