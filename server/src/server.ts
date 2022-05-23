import express from 'express'
import Configuration from './configurations/Configuration'
import Middleware from './middlewares/Middleware'
import Logger from './utils/Logger'
import UserRoutes from './routes/UserRoutes'
import MessageRoutes from './routes/MessageRoutes'
import CommentRoutes from './routes/CommentRoutes'


const server = express()
Middleware.applyMiddlewares(server)

UserRoutes(server)
MessageRoutes(server)
CommentRoutes(server)

Middleware.errorHandlerAndNotFound(server)
Configuration.connectToPort(server)
Configuration.connectToDatabase().then(() => {
	Logger.debug('--== lolz ==--')
})

export default server