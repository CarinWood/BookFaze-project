import Logger from '../utils/Logger'
import UserModel from '../models/UserModel'
import StatusCode from '../utils/StatusCode'
import { Request, Response } from 'express'
import { CreateUser, ReadUser } from '../utils/interfaces/Users'
import bcrypt from 'bcrypt'

const saltRounds: number = 10;
const encryptPassword = async (password: string) => {
    let newPassword: string = '';
    await bcrypt.hash(password, saltRounds).then(function (hash: any) {
        newPassword = hash;
    });
    return newPassword;
};



const createNewUser = async (req: Request, res: Response) => {
    try {
        Logger.info('createNewUser()')
        Logger.http(req.body)
        let {username, password, active, image}: CreateUser = req.body
        password = await encryptPassword(password)
        if (username && password) {
            const newObject: CreateUser = {
                username,
                password,
                active: false,
				image: 'data:image/jpeg;base64,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'
            }
            Logger.http(newObject)

            const user = new UserModel(newObject)
            const dbResponse = await user.save()
            Logger.http(dbResponse)
            res.status(StatusCode.CREATED).send(dbResponse)

        } else {
            Logger.error('username, password, active or image failed')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Incorrect body'
            })
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error while creating New User'
        })
    }
}

interface VerifyUser {
    message: boolean
}

interface SearchForUser {
    username: string
}

const verifyUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body
        Logger.http(req.body)

        const query: SearchForUser = {username: String(username)}
        const dbQuery = await UserModel.find(query)
        Logger.debug(dbQuery)

        // Verify password in bcrypt
        let response: VerifyUser
        await bcrypt.compare(String(password), dbQuery[0].password)
            .then(function (result) {
                Logger.debug('bcrypt')
                response = {
                    message: result
                }
            })

        res.status(StatusCode.OK).send(response)

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to retrieve user with username: ${ req.query.username }`,
                error: error.message
            })
    }
}


const getUser = (req: Request, res: Response) => {
	try {
		UserModel.find({username: req.body.username, password: req.body.password}, (error: ErrorCallback, users: Array<ReadUser>) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error getting user'
				})
			} else {
				Logger.http(users)
				res.status(StatusCode.OK).send(users)
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error getting user by name'
		})
	}
}

const getUserByUsername = (req: Request, res: Response) => {
	try {
		UserModel.find({username: req.body.username}, (error: ErrorCallback, users: Array<ReadUser>) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error getting user'
				})
			} else {
				Logger.http(users)
				res.status(StatusCode.OK).send(users)
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error getting user by name'
		})
	}
}

const getOnlineUsers = (req: Request, res: Response) => {
	try {
		UserModel.find({active: true}, (error: ErrorCallback, users: Array<ReadUser>) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error getting online users'
				})
			} else {
				Logger.http(users)
				res.status(StatusCode.OK).send(users)
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error getting user by name'
		})
	}
}

const updateUserById = (request: Request, response: Response) => {
	try {
		const updatedUser = {
			active: true
		}
		Logger.debug(request.params.id)
		Logger.debug(updatedUser)
		UserModel.findByIdAndUpdate(request.params.id, updatedUser, {new: true}, (error, user) => {
			if (error) {
				Logger.error(error)
				response.status(StatusCode.BAD_REQUEST).send({
					error: 'Error updating user with id ' + request.params.id
				})
			} else {
				Logger.info(user)
				response.status(StatusCode.OK).send(user ? user : {
					message: `User with id '${ request.params.id }' not found`
				})
			}
		})
	} catch (error) {
		Logger.error(error)
		response.status(StatusCode.BAD_REQUEST).send({
			error: 'Error updating user'
		})
	}
}

const updateActiveToFalse = (req: Request, res: Response) => {
	try {
		const updatedUser = {
			active: false
		}
	
		Logger.debug(updatedUser)
		UserModel.findByIdAndUpdate(req.params.id, updatedUser, {new: true}, (error, user) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error updating user with id '
				})
			} else {
				Logger.info(user)
				res.status(StatusCode.OK).send(user ? user : {
					message: `User not found`
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

interface IUpdatedImage {
    image: string
}

const updateImage = (req: Request, res: Response) => {
	try {
		Logger.debug(req.params.id)
		Logger.debug('req.body' + req.body)
		const updatedImage: IUpdatedImage = {
			image: req.body.image
		}
		Logger.debug('updatedImage' + updatedImage)
		
		UserModel.findByIdAndUpdate(req.params.id, updatedImage, {new : true }, (error, message: ReadUser) => {
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
			error: 'Error updating image'
		})
	}
}

const getUserById = (req: Request, res: Response) => {
	try {
		UserModel.findById(req.params.id, '', (error: ErrorCallback, user: ReadUser) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error getting user'
				})
			} else {
				Logger.http(user)
				res.status(StatusCode.OK).send(user ? user : {
					message: `User with id '${ req.params.id }' not found`
				})
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error getting user by Id'
		})
	}
}

const deleteUserById = (req: Request, res: Response) => {
	try {
		UserModel.findByIdAndRemove(req.params.id, (error: ErrorCallback, user: ReadUser) => {
			if (error) {
				Logger.error(error)
				res.status(StatusCode.BAD_REQUEST).send({
					error: 'Error deleting user'
				})
			} else {
				Logger.http(user)
				res.status(StatusCode.OK).json(
						user ? {
							message: `User with id '${ req.params.id }' was deleted from database!`
						}
						: {
							message: `User with id '${ req.params.id }' not found`
						})
			}
		})
	} catch (error) {
		Logger.error(error)
		res.status(StatusCode.BAD_REQUEST).send({
			error: 'Error deleting user'
		})
	}
}













export default {
	createNewUser,
	verifyUser,
	getUser,
	updateUserById,
	getUserByUsername,
	getOnlineUsers,
	updateActiveToFalse,
	updateImage,
	getUserById,
	deleteUserById
}