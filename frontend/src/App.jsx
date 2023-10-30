import {React,useState} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/EditPost'
import Profile from './pages/Profile'
import ProfilePosts from './pages/ProfilePosts'
import { UserContextProvider } from './context/UserContext'
// import DisplayContent from './pages/DisplayContent'

const App = () => {
  const [content, setContent] = useState("");
  return (
    <UserContextProvider>
      
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Posts/Post/:id" element={<PostDetails/>}/>
        <Route path="/write" element={<CreatePost />}/>
        <Route path="/edit" element={<UpdatePost />}/>
        <Route path="/profile/:id" element={<Profile/>}/>


        
        {/* <Route path="/display" element={<DisplayContent content={content}/>}/> */}





      </Routes>
      
    </UserContextProvider>
  )
}

export default App