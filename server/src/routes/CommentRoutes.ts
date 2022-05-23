import { Express } from 'express'
import CommentController from '../controllers/CommentController'

const CommentRoutes = (app: Express) => {
	// CREATE
	app.post('/comment/', CommentController.createNewComment)

    //READ
    app.post('/getcom/', CommentController.searchByKey)

    //UPDATE
    app.put(`/update/comment/:id`, CommentController.updateCommentById )

	//DELETE
    app.delete('/comment/delete/:id', CommentController.deleteComment)
	
	

}

export default CommentRoutes
