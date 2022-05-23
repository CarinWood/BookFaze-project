import {FC} from 'react'
import { StringLiteralLike } from 'typescript'
import './registerPopup.css'


interface Props {
    username: string
    openRegisterFunc: () => void
}

const RegisterPopup:FC<Props> = ({username, openRegisterFunc}) => {

   


  return (
    <div className='popup'>
        <h3 className='congrats-text'>Congrats {username}!</h3>
        <h3 className='popup-heading'>You have successfully been registered!</h3>
        <p>Please sign in with your username and password</p>
        <button onClick={() => openRegisterFunc()} className='ok-btn'>OK</button>

    </div>
  )
}

export default RegisterPopup