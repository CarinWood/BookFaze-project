import dotenv from 'dotenv'
import { model, Schema } from 'mongoose'
import { CreateComment } from '../utils/interfaces/Comment'

dotenv.config()

const dbCollection = process.env.MONGODB_COLLECTION_COMMENT

const CommentSchema = new Schema<CreateComment>({
    text: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required:true
    },

    messagekey: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required:true
    }

}, {timestamps: true}
)

const CommentModel = model<CreateComment>(dbCollection, CommentSchema)

export default CommentModel

