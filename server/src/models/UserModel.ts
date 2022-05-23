import { timeStamp } from 'console'
import dotenv from 'dotenv'
import { model, Schema } from 'mongoose'
import { CreateUser } from '../utils/interfaces/Users'

dotenv.config()

const dbCollection = process.env.MONGODB_COLLECTION_USER

const UserSchema = new Schema<CreateUser>({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true
    },

    image: {
        type: String,
        required: true
    }
}, {timestamps: true}

)

const UserModel = model<CreateUser>(dbCollection, UserSchema)

export default UserModel