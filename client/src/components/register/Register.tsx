import { FC, useState } from 'react'
import './register.css'
import RegisterPopup from '../registerPopup/RegisterPopup'
import UserService from '../../utils/api/services/UserService'

interface Props {
    openRegisterFunc: () => void
}

const Register:FC<Props> = ({openRegisterFunc}) => {

    const [openPopup, setOpenPopup] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = () => {
        const newUser = {
            username: username,
            password: password,
        }

        const usernameToCheck = {
            "username": username
        }

        //Check if username already exists
        UserService.searchUsername(usernameToCheck)
        .then(response => {

                if (response.data.length > 0) {
               alert('Username already exists!')
            } else {
                UserService.createUser(newUser)
                .then(response => {
                    console.log(response.data)
                    setOpenPopup(true)
                })
                .catch(error => {
                    console.log(error)
                    console.log('fail')
                })
        
            }

        })
        .catch(error => {
            console.log(error)
        })
    


     
       
    }


  return (
    <>
        {openPopup ? <RegisterPopup username={username} openRegisterFunc={openRegisterFunc}/> :
    <div className='register-card'>
    <h1 className='join-bookface'>Join BookFaze now!</h1>
    <h3 className='fill-in'>Please fill in the register form below ...</h3> 
        <div className='register-username-div'>
            <input
                placeholder="Username*"
                className='register-username-input'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
        </div>
        <div className='register-password-div'>
            <input
                placeholder="Password*"
                className='register-password-input'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
    <button onClick={() => registerUser()} className='register-button'>Register</button>
    </div>
    }
    </>
  )
}

export default Register