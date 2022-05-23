import {FC, useState} from 'react'
import MessageService from '../../utils/api/services/MessageService'
import './editMessage.css'

interface Props {
    showEditWindow: () => void
    message: string
    id: string
    getAllMessages: () => void
}

const EditMessage:FC<Props> = ({showEditWindow, message, id, getAllMessages}) => {

    const [editMessage, setEditMessage] = useState(message)

    const updateMessageFunc = () => {
      const _updateMessage = {
        message: editMessage
      }
      console.log(id)

       MessageService.updateMessage(id, _updateMessage)
       .then(res => {
         getAllMessages()
         showEditWindow()
       })
       .catch(error => console.log(error))
    }

  return (
    <div className='edit-window'>
        <h3 className='edit-text'>Edit your post:</h3>
        <textarea
            placeholder={message} 
            className='edit-message-input'
            value={editMessage}
            onChange={e => setEditMessage(e.target.value) }
        />
        <button className='done-btn' onClick={() => updateMessageFunc()}>Done</button>
    </div>
  )
}

export default EditMessage