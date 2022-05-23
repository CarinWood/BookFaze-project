import {FC} from 'react'
import './deletePopup.css'

interface Props {
    id: string
    deleteMessage: (id: string) => void
    foldDelete: () => void
}

const DeletePopup:FC<Props> = ({id, deleteMessage, foldDelete}) => {

 

  return (
    <div className='delete-div'>
          <p className='delete-message'>Are you sure you want to delete this post?</p>
          <div className='button-div'>
              <button  className='button' onClick={() => foldDelete()}>Cancel</button>
              <button className='button' onClick={() => deleteMessage(id)}>OK</button>
          </div>
    </div>
  )
}

export default DeletePopup