import {FC} from 'react'
import {ReadUser} from '../../utils/api/interfaces/User'
import './onlineUsers.css'


interface Props {
    onlineUsers: Array<ReadUser>
}

const OnlineUsers:FC<Props> = ({onlineUsers}) => {


  return (
    <section className='online-users-wrapper'>
        <h1 className='online-headline'>Online Users:</h1>
        {onlineUsers.map(user => (
          
            <div key={user._id} className='online-username-div'>
                <p className='green-dot'></p>
                <img className="online-user-image" src={user.image} alt=""/>
                <p className='online-user-name'>{user.username}</p>
            </div>
          
        ))}
        
    </section>
  )
}

export default OnlineUsers