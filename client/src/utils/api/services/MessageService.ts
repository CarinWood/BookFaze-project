import http from '../MyApi'
import { CreateMessage } from '../interfaces/Message'



const MessageService = {
    createMessage: (newMessage: {}) => {
        return http.post('/message', newMessage)
    },

    getAll: () => {
        return http.post('/getall')
    },

    deleteMessage: (id: string) => {
        return http.delete(`/delete/${id}`)
    },

    updateMessage: (id:string, updatedMessage: {}) => {
        return http.put(`/message/update/${id}`, updatedMessage)
    }

}

export default MessageService