import { FC, useEffect, useState } from 'react'
import UserService from '../../utils/api/services/UserService'
import './deleteAccountPopup.css'
import { useNavigate } from 'react-router-dom'

interface Props {
  toggleDeleteAccountPopup: () => void
}



const DeleteAccountPopup:FC<Props> = ({toggleDeleteAccountPopup}) => {
  const [userId, setUserId] = useState<string | null>('')
  const navigate = useNavigate()

  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
  })

  const deleteAccount = () => {
      console.log(userId)
      UserService.deleteUser(userId)
      .then(res => {
        navigate('/')
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='delete-account-div'>
    <p className='delete-account-message'>Are you sure you want to delete your account?</p>
    <div className='delete-account-button-div'>
        <button  className='delete-account-button' onClick={() => toggleDeleteAccountPopup()}>Cancel</button>
        <button className='delete-account-button' onClick={() => deleteAccount()}>OK</button>
    </div>
</div>
  )
}

export default DeleteAccountPopup