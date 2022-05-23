import { FC, useState, useEffect } from 'react'
import './messageCard.css'
import {CreateMessage } from '../../utils/api/interfaces/Message'
import MessageService from '../../utils/api/services/MessageService'
import Menu from '../menu/Menu'
import DeletePopup from '../../deletePopup/DeletePopup'
import { MdArrowRight, MdOutlineArrowDropDown } from 'react-icons/md';
import CommentCard from '../commentCard/CommentCard'
import CommentService from '../../utils/api/services/CommentService'
import EditMessage from '../editMessage/EditMessage'
import UserService from '../../utils/api/services/UserService'

interface Props {
  message: string
  name: string
  id: string
  image: string
  createdAt: any
  deleteMessage: (id: string) => void
  getAllMessages: () => void
 
}

const MessageCard:FC<Props> = ({message, name, image, id, deleteMessage, createdAt, getAllMessages}) => {

    const [foldMenu, setFoldMenu] = useState(false)
    const [foldDeletePopup, setFoldDeletePopup] = useState(false)
    const [shadow, setShadow] = useState(false)
    const [foldComments, setFoldComments] = useState(false)
    const [counter, setCounter] = useState(0)
    const [user, setUser] =useState<string | null>('')
    const [toggleEdit, setToggleEdit] = useState(false)
    const [userImage, setUserImage] = useState('')
   

    let slicedDate = createdAt.slice(0, 10)

    useEffect(() => {
      getComments()
      setUser(localStorage.getItem("username"))   
    }, [])

    const foldDelete = () => {
      setFoldDeletePopup(!foldDeletePopup)
      setShadow(!shadow)
  }
  
    const foldMenuFunc = () => {
      setFoldMenu(!foldMenu)
    }

    const foldCommentsFunc = () => {
      setFoldComments(!foldComments)
      }

      const getComments = () => {
        const messageKey = {
            messagekey: id
          }
          CommentService.searchByKey(messageKey)
          .then(response => {
            updateCounter(response.data.length)
       
          })
          .catch(error => console.log(error))
    } 
    
   const updateCounter = (num: number) => {
     setCounter(num)
   }

   const showEditWindow = () => {
    setToggleEdit(!toggleEdit)
    setFoldMenu(false)
}
   
  return (
    <>
      {toggleEdit && <EditMessage showEditWindow={showEditWindow} message={message} id={id} getAllMessages={getAllMessages}/>}
      <div className={shadow ? "card-div shadow" : "card-div"}>     
          <div className="card-header">
            <img className='card-image' src={image} alt="" />
            <p className="card-name">{name}</p>
            <p className="card-date">{slicedDate}</p>
            {user === name && <p onClick={() => foldMenuFunc()} className='circle'><span className='dots'>...</span></p>}
            {foldMenu && <Menu foldDelete={foldDelete} foldMenuFunc={foldMenuFunc} id={id} showEditWindow={showEditWindow}/>}
          </div>

          <div className="main-card">
              <p className="card-text">{message}</p>
          </div>
          <p 
            className='comments' 
            onClick={() => foldCommentsFunc()}>
              <span className='counter'>{counter}</span>Comments
                {foldComments === false ? 
                  <MdArrowRight className='arrow'/>
                  : <MdOutlineArrowDropDown className='arrow'/>
                }
              
          </p>
      </div>
      {foldComments && <CommentCard messageId={id} updateCounter={updateCounter} />}

      {foldDeletePopup && <DeletePopup id={id} deleteMessage={deleteMessage} foldDelete={foldDelete}/>}
    </>
  )
}

export default MessageCard