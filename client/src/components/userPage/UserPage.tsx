import { useState, useEffect } from 'react'
import UserService from '../../utils/api/services/UserService'
import DeleteAccountPopup from '../deleteAccountPopup/DeleteAccountPopup'
import Header from '../header/Header'
import './userPage.css'



const UserPage = () => {
  const [imageLink, setImageLink] = useState<string>('')
  const [userId, setUserId] = useState<string | null>('hej')
  const [profileImage, setProfileImage] = useState('')
  const [username, setUsername] = useState<string|null>('')
  const [userImage, setUserImage] = useState('')
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
  
  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
    setUsername(localStorage.getItem("username"))
    getImage()
  })

  const submitPhotoFunc = () => {
    console.log(userImage)
  
      const _link = {
      image: userImage
    }

    console.log(_link)

     UserService.updateImage(userId, _link)
     .then(res => {
       console.log(res.data.image)
       localStorage.setItem("image", res.data.image)
       getImage()

     })
     .catch(error => console.log(error))
  }

  const getImage = () => {
      UserService.getUserById(userId)
      .then(res => {
        setProfileImage(res.data.image)
        setImageLink('')
      })
      .catch(error => console.log(error))
  }

  const toggleDeleteAccountPopup = () => {
    setDeleteAccountPopup(!deleteAccountPopup)
  }

  return (
    <>
    <Header />
    <div className='userpage'> 
        <h2 className='profile-heading'>Edit your profile image</h2>
        <div className='top-div'>
        <section className='profile-image-section'>
          <p className='choose'>Upload your own profile image (URL):</p>
          <div className='upload-div'>
          <input 
          value={userImage}
          onChange={e => setUserImage(e.target.value)}
          className='upload-image-input'
          />
        
          <button className='submit-image-btn' onClick={() => submitPhotoFunc()}>Submit</button>
          </div>

        </section>
        <section className='profile'>
            <div className='picandname-div'>
                <img src={profileImage} className='current-image' alt="profile"/>
            </div>
        </section>
        </div>
        <h2 className='delete-heading'>Delete your account</h2>
        <div className='delete-user-div'>
          <p className='delete-text'>
            You can delete your account here. 
            Please consider that your decision will be irreversibly and your username will be free for anyone to use
          </p>
          <button className='delete-account-button' onClick={() => toggleDeleteAccountPopup()}>Delete</button>
        </div>
    </div>
    { deleteAccountPopup && <DeleteAccountPopup toggleDeleteAccountPopup={toggleDeleteAccountPopup}/>}
    </>
  )
}

export default UserPage