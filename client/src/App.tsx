import './App.css';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom'
import Main from './components/main/Main';
import UserPage from './components/userPage/UserPage';


function App() {
  
 

  return (
    
    <div className="App">
   
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/main' element={<Main/>}/>
          <Route path='/user' element={<UserPage/>}/>
        </Routes>
  
    </div>
  );
}

export default App;
