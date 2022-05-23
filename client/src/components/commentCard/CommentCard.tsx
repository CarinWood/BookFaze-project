import {useState, FC, useEffect} from 'react'
import CommentService from '../../utils/api/services/CommentService'
import './commentCard.css'
import { ReadComment } from '../../utils/api/interfaces/Comment'
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import UserService from '../../utils/api/services/UserService';


interface Props {
    messageId: string
    updateCounter: (num: number) => void
   
}


const CommentCard:FC<Props> = ({messageId, updateCounter}) => {
    const [user, setUser] = useState<string | null>('')
    const [comment, setComment] = useState('')
    const [data, setData] = useState<Array<ReadComment>>([])
    const [toggleInput, setToggleInput] = useState('')
    const [newComment, setNewComment] = useState('')
    const [image, setImage] = useState<string | null>('')
 


   useEffect(() => {
    setUser(localStorage.getItem("username"))
    setImage(localStorage.getItem("image"))
    getComments()
   }, [])

    const createCommentFunc = () => {
        const newComment = {
            text: comment,
            name: user,
            messagekey: messageId,
            image: image
        }
        
        CommentService.createComment(newComment)
        .then(response => {
            setComment('')
            getComments()
        })
        .catch(error => console.log(error))
    }

    const getComments = () => {
        const messageKey = {
            messagekey: messageId
          }
          CommentService.searchByKey(messageKey)
          .then(response => {
            setData(response.data)
            updateCounter(response.data.length)
       
          })
          .catch(error => console.log(error))
    } 

    const deleteComment = (_id: string) => {

       CommentService.deleteComment(_id)
                .then(response => {
                getComments()
             })
         .catch(error => console.log(error))
    }

    const openEditField = (id: string, text: string) => {
            setToggleInput(id)
            setNewComment(text)
    }

    const updateCommentFunc = () => {
        const _newComment = {
            text: newComment
        }

        CommentService.updateComment(toggleInput, _newComment)
        .then(res => {
            getComments()
            setToggleInput('')
        })
        .catch(error => console.log(error))
    }
   
    const cancelCommentFunc = () => {
        setToggleInput('')
    }

 

  return (
    <div className='comments-card'>
        <div className="all-comments-div">
                {data.map(item => (
                  
                    <div className='card'>
                        <div className='comment-card-header'>
                        <img className='comment-image' src={item.image} alt="" />
                        <p className='item-name'>{item.name}:</p>
                        </div>
                        {toggleInput === item._id 
                        ? <> <textarea 
                                value={newComment} 
                                className='edit-comment-input'
                                onChange={e => setNewComment(e.target.value)}
                          />
                          <div className='comment-buttons-area'>
                          <button className='cancel-btn' onClick={() => cancelCommentFunc()}>Cancel</button>
                          <button className='post-comment-btn' onClick={() => updateCommentFunc()}>Post</button>
                          </div>
                          </>
                        :<p className='item-text'>{item.text}</p>
                        }
                        {user === item.name && <p className='delete-comment' onClick={() => deleteComment(item._id)}><FaRegTrashAlt className='trashcan'/></p>}
                     
                        {user === item.name && <p className='edit-comment' onClick={() => openEditField(item._id, item.text)}><FaRegEdit className='trashcan'/></p>}
                    </div>
                   
                ))}
       </div>
       
        <section className="comment-input-area">
        
        <input
            className='comment-input'
            placeholder='Write a comment ...'
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
       /> 
       <button className='send-btn' onClick={() => createCommentFunc()}>Send</button>  

        </section>
        
    </div>
  )
}

export default CommentCard