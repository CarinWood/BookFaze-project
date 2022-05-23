import Logger from '../utils/Logger'
import CommentModel from '../models/CommentModel'
import StatusCode from '../utils/StatusCode'
import { Request, Response } from 'express'
import { CreateComment, ReadComment } from '../utils/interfaces/Comment'

const createNewComment = async (req: Request, res: Response) => {
	Logger.info('createNewComment()')
	Logger.http(req.body)
	const {text, name, messagekey, image}: CreateComment = req.body
	if (text && name && messagekey && image) {
		const newObject: CreateComment = {
			text: text,
			name: name,
			messagekey: messagekey,
			image: image

		}
		Logger.debug(newObject)
		try {
			const comment = new CommentModel(newObject)
			const dbResponse = await comment.save()
			Logger.debug(dbResponse)
			res.status(StatusCode.CREATED).send(dbResponse)
		} catch (error) {
			Logger.error(error)
			res.status(StatusCode.BAD_REQUEST).send({
				error: 'Error creating user'
			})
		}
	} else {
		Logger.error('text, name or messagekey failed')
		res.status(StatusCode.NO_CONTENT).send('No body')
	}
}

const searchByKey = async (req: Request, res: Response) => {
	try {
		CommentModel.find({messagekey: req.body.messagekey}, '', (error: ErrorCallback, comments: Array<ReadComment>) => {
			if (error) {
				Logger.error(error)
				res.status(400).send('Error getting Games')
			} else {
				Logger.http(comments)
				res.status(200).send(comments)
			}
		})
	}
	catch(error) {
		Logger.error(error)
	res.status(400).send({
		error: 'Error getting user'
	})
	}
}

const deleteComment = async (req: Request, res: Response) => {
	try {
		CommentModel.findByIdAndDelete(req.params.id, (error: ErrorCallback, comment: ReadComment) => {
			if(error) {
				Logger.error(error)
				res.status(404).send('Error while trying to delete comment')
			} else {
				Logger.http(comment)
				res.status(200).send('Comment deleted')
			}
		})

	}
	catch (error) {
		Logger.error(error)
		res.status(400).send({
			error: 'Error deleting comment'
		})
	}
}

interface IUpdatedComment {
	text: string
}

const updateCommentById = (req: Request, res: Response) => {
	try {
		Logger.debug(req.params.id)
		Logger.debug(req.body)
		const updatedComment: IUpdatedComment = {
			text: req.body.text
		}

		Logger.debug(updatedComment)
		
		CommentModel.findByIdAndUpdate(req.params.id, updatedComment, {new : true }, (error, comment: ReadComment) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error updating comment'
				})
			} else {
				Logger.http(comment)
				res.status(StatusCode.OK).send(comment ? comment : {
					message: `Comment with id '${ req.params.id }' not found`
				})
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error updating comment'
		})
	}
}



export default {
    createNewComment,
	searchByKey,
	deleteComment,
	updateCommentById
	
	
}