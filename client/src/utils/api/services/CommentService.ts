import http from '../MyApi'
import { CreateComment } from '../interfaces/Comment'



const CommentService =  {
    createComment: (newComment: {}) => {
        return http.post('/comment', newComment)
    },

    searchByKey: (messageKey: object) => {
        return http.post('/getcom', messageKey)
    },

    deleteComment: (id: string) => {
        return http.delete(`/comment/delete/${id}`)
    },

    updateComment: (id: string, text: {}) => {
        return http.put(`/update/comment/${id}`, text)
    } 
    

}


export default CommentService
