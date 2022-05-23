import { FC, useState, useEffect } from 'react'
import './header.css'
import UserService from '../../utils/api/services/UserService'
import { useNavigate } from 'react-router-dom'



const Header:FC = () => {
    const [user, setUser] = useState<string | null>('')
    const [userId, setUserId] = useState<any>('')
    const [image, setImage] = useState<any>('')
    const navigate = useNavigate()
  

    useEffect(() => {
        setUser(localStorage.getItem("username"))
        setUserId(localStorage.getItem("userId"))
        setImage(localStorage.getItem("image"))
    }, [])


    const logoutFunc = () => {
        const _id = userId
        console.log(userId)
       
        UserService.updateActiveToFalse(_id)
        .then(response => {
            console.log(response.data)
            navigate('/')
        })
        .catch(error => console.log(error))
    } 

    const goToUserPage = () => {
        navigate('/user')
    }

    const goToMainFunc = () => {
        navigate('/main')
    }



  return (
    <div className='header'>
        <div className='logotype' onClick={() => goToMainFunc()}>BookFaze</div>
        <section className='right-side'>
        <img src={image} className="profile-header-img" alt="" />
        <p className='user' onClick={() => goToUserPage()}>{user}</p>
        <p className='logout' onClick={() => logoutFunc()}>(Logout)</p>
        </section>
    </div>
  )
}

export default Header