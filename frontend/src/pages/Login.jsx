import {React,useState} from 'react'
import Footer from '../components/Footer'
import { Link,Navigate ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import {URL} from "../Url";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';


const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);
  const navigate=useNavigate();
  const {setUser}=useContext(UserContext);

  // console.log(email,password);


  const handleLogin=async()=>
  {
    try{
     const result=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true});
     setUser(result.data);
    //  console.log("login sucessful");
     navigate("/");

    //  console.log(result.data);

    }
    catch(err)
    {
      setError(true);
      console.log(err);
    }

  }

  return (
    <>
     <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blogies</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Log in to your account</h1>
         <input  className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" onChange={(e)=>(setEmail(e.target.value))}/>
        
         <input  className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" onChange={(e)=>(setPassword(e.target.value))}/>
        
         <button  className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black " onClick={handleLogin}>Log in </button>
        
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="w-full md:w-[280px] lg:w-[350px] flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-2">
  <div className="flex items-center"> {/* Add a flex container */}
    <p className="mr-2">New here?</p> {/* Add some margin between the text */}
    <p className="text-gray-500 hover:text-black">
      <Link to="/register">Register</Link>
    </p>
  </div>
  <p className="text-red-500 hover:text-black">
    <Link to="/">Forget Password?</Link>
  </p>
</div>



       </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login