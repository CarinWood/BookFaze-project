import http from '../MyApi'
import { CreateUser } from '../interfaces/User'

const UserService = {
    createUser: (newUser: {}) => {
        return http.post('/user', newUser)
    },

    verifyUser: (user: {}) => {
        return http.post('/verify', user)
    },

    searchUser: (user: object) => {
        return http.post('/user/username/password', user)
    },

    searchUsername: (_username: object) => {
        return http.post('./user/username', _username)
    },

    updateActive: (id: string, update: object) => {
        return http.put(`/user/${id}`, update)
    },

    onlineUsers: () => {
        return http.post('/user/online')
    },

    updateActiveToFalse: (id: string) => {
        return http.put(`/update/${id}`)
    },

    updateImage: (id: string | null, image: {}) => {
        return http.put(`update/image/${id}`, image)
    },

    getUserById: (id: string | null) => {
        return http.post(`/get/user/${id}`)
    },

    deleteUser: (id: string | null) => {
        return http.delete(`/user/${id}`)
    }

}

export default UserService