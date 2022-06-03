import { Express } from 'express'
import MessageController from '../controllers/MessageController'


const MessageRoutes = (app: Express) => {

    //CREATE
    app.post('/message/', MessageController.createMessage)

    //READ
    app.post('/getall', MessageController.getAllMessages)
    app.post('/getbyname/:name', MessageController.g)

    //UPDATE
    app.put('/message/update/:id', MessageController.updateMessageById)

    //DELETE
    app.delete('/delete/:id', MessageController.deleteMessageById)
}


export default MessageRoutes