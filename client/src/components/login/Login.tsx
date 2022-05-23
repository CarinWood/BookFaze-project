import { useState } from 'react'
import UserService from '../../utils/api/services/UserService'
import Register from '../register/Register'
import './login.css'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const [openRegister, setOpenRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    

    let navigate = useNavigate()
 

    const openRegisterFunc = () => {
        setOpenRegister(!openRegister)
    }

    const LoginFunc = () => {

        const trimmedName:string = username.trim()
        const trimmedPassword:string = password.trim()
        const _user = {
            username: trimmedName,
            password: trimmedPassword,            
        }

        localStorage.setItem('username', trimmedName)

        UserService.verifyUser(_user)
        .then(res => {
            console.log(res.data.message)
            if (res.data.message === true) {
                const _username = {
                    username: trimmedName
                }
                UserService.searchUsername(_username)
                .then(response => {
                    const id = response.data[0]._id
                    localStorage.setItem("userId", id)

                    const update = { "active": true}

                      UserService.updateActive(id, update)
                             .then(resp => {
                               console.log(resp.data)
                               console.log(resp.data.image)
                               localStorage.setItem("image", resp.data.image)
                                
                              navigate('/main')
                            })
                          .catch(error => console.log(error))
                })
                .catch(error => console.log(error))

            } else {
                alert('Username or Password is not correct')
            }
        })
        .catch(error => console.log(error))
    }



  return (
    <>
        <h1 className='headline'>BookFaze!</h1>
        {openRegister === false ?
        <section className='login-square'>
            <h1 className='signin-heading'>SIGN IN</h1>
            <div className='input-div'>
                <input
                    className="name-input"
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className='password-input'
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
                
            <div className='button-area'>
                    <button onClick={() => LoginFunc()} className='login-btn'>Go!</button>
                    <div className='register-div'>
                        <p className='not-a-member'>Not a member yet?</p>
                        <p onClick={() => openRegisterFunc()} className='register'><i>Register</i></p>
                    </div>
            </div>
                
        </section>
        : <Register openRegisterFunc={openRegisterFunc}/>}
    </>
  )
}

export default Login