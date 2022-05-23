import { Express } from 'express'
import UserController from '../controllers/UserController'


const UserRoutes = (app: Express) => {
	// CREATE
	app.post('/user/', UserController.createNewUser)

	//READ
	app.post('/verify', UserController.verifyUser)
	app.post('/user/username/password', UserController.getUser)
	app.post('/user/username', UserController.getUserByUsername)
	app.post('/user/online', UserController.getOnlineUsers)
	app.post('/get/user/:id', UserController.getUserById)

	//UPDATE
	app.put('/user/:id', UserController.updateUserById)
	app.put('/update/:id', UserController.updateActiveToFalse)
	app.put('/update/image/:id', UserController.updateImage)

	//DELETE
	app.delete('/user/:id', UserController.deleteUserById)

}

export default UserRoutes