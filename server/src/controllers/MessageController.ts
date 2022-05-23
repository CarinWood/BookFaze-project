import Logger from '../utils/Logger'
import MessageModel from '../models/MessageModel'
import StatusCode from '../utils/StatusCode'
import { Request, Response } from 'express'
import { CreateMessage, ReadMessage } from '../utils/interfaces/Message'

const createMessage = async (req: Request, res: Response) => {
	Logger.info('createMessage()')
	Logger.http('req.body' + req.body)
	const {message, username, image} = req.body
	if (message && username && image) {
		const newObject: CreateMessage = {
			message: message,
			username: username,
			image: image
		}
		Logger.debug('newObject' + newObject)
		try {
			const _message = new MessageModel(newObject)
			const dbResponse = await _message.save()
			Logger.debug('dbResponse' + dbResponse)
			res.status(StatusCode.CREATED).send(dbResponse)
		} catch (error) {
			Logger.error(error)
			res.status(StatusCode.BAD_REQUEST).send({
				error: 'Error creating message'
			})
		}
	} else {
		Logger.error('message och username failed')
		res.status(StatusCode.NO_CONTENT).send('No body')
	}
}

const getAllMessages = async (req: Request, res: Response) => {

    try {
        MessageModel.find({} , '', (error: ErrorCallback, messages: Array<ReadMessage>) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error getting messages'
                })
            } else {
                Logger.http(messages)
                res.status(StatusCode.OK).send(messages)
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error getting messages'
        })
    }
}


const deleteMessageById = (req: Request, res: Response) => {
    try {
        MessageModel.findByIdAndRemove(req.params.id, (error: ErrorCallback, message: ReadMessage) => {
            if (error) {
                Logger.error('error' + error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error deleting message'
                })
            } else {
                Logger.http('message' + message)
                res.status(StatusCode.OK).json(
                    message ? {
                            message: `Message with id '${ req.params.id }' was deleted from database!`
                        }
                        : {
                            message: `Message with id '${ req.params.id }' not found`
                        })
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error deleting message'
        })
    }
}

interface UpdatedMessage {
    message: string
}

const updateMessageById = (req: Request, res: Response) => {
	try {
		Logger.debug(req.params.id)
		Logger.debug('req.body' + req.body)
		const updatedMessage: UpdatedMessage = {
			message: req.body.message
		}
		Logger.debug('updatedMessage' + updatedMessage)
		
		MessageModel.findByIdAndUpdate(req.params.id, updatedMessage, {new : true }, (error, message: ReadMessage) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error updating user'
				})
			} else {
				Logger.http("message" + message)
				res.status(StatusCode.OK).send(message ? message : {
					message: `User with id '${ req.params.id }' not found`
				})
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error updating user'
		})
	}
}











export default {
    createMessage,
    getAllMessages,
	deleteMessageById,
	updateMessageById
}
