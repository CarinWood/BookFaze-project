import {useEffect, useState} from 'react'
import { ReadUser } from '../../utils/api/interfaces/User'
import UserService from '../../utils/api/services/UserService'
import MessageService from '../../utils/api/services/MessageService'
import OnlineUsers from '../onlineUsers/OnlineUsers'
import './main.css'
import { useNavigate } from 'react-router-dom'
import MessageCard from '../messageCard/MessageCard'
import { ReadMessage } from '../../utils/api/interfaces/Message'
import Header from '../header/Header'
import EditMessage from '../editMessage/EditMessage'


const Main = () => {

    const navigate = useNavigate()

    const [onlineUsers, setOnlineUsers] = useState<Array<ReadUser>>([])
    const [user, setUser] = useState<string | null>('')
    const [text, setText] = useState('')
    const [posts, setPosts] = useState<Array<ReadMessage>>([])
    const [profileImage, setProfileImage] = useState<string | null>('')
    const [userId, setUserId] = useState<string | null>('')

  
    useEffect(() => {
        getOnlineUsers()
        getAllMessages()
        setUser(localStorage.getItem("username"))
        setUserId(localStorage.getItem("userId"))
        setProfileImage(localStorage.getItem("image"))
    
       
    },[])


    const getOnlineUsers = () => {
        UserService.onlineUsers()
        .then(response => {
            setOnlineUsers(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }


    const createMessage = () => {

        console.log(profileImage)
        const _newMessage = {
            message: text,
            username: user,
            image: profileImage  
        }

         MessageService.createMessage(_newMessage)
         .then(response => {
             console.log(response.data)
             getAllMessages()
             setText('')
         })
         .catch(error => console.log(error))
    }

    const getAllMessages = () => {
        MessageService.getAll()
        .then(response => { 
            console.log(response.data)
            setPosts(response.data.sort((a:any ,b:any): any => {
                  return 1
                
            }))
        })
        .catch(error => console.log(error))
      }

    
    const deleteMessage = (id: string) => {
        MessageService.deleteMessage(id)
        .then(response => {
            getAllMessages()
        })
        .catch(error => console.log(error))
    }

    
  return (
      <>
       <Header/>
      
    <div className='messages-div'>
        <OnlineUsers onlineUsers={onlineUsers} />
        <div className='write-message'>
            <textarea 
                placeholder="What's on your mind today?"
                className='write-message-input'
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => createMessage()} className='post-btn'>Post</button>
        </div>

       <section>
           {posts.map(post => (
               <>               
               <MessageCard key={post._id} message={post.message} name={post.username} image={post.image} id={post._id} deleteMessage={deleteMessage} createdAt={post.createdAt} getAllMessages={getAllMessages}/>
               </>
           ))}
       </section>
         

    </div>
    </>
  )
}

export default Main