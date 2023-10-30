// import {React,useState,useEffect} from 'react';
// import HomePosts from "../components/HomePosts"
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import axios from "axios"
// import {URL} from "../Url"

// const Home = () => {

//   const [posts , setPosts]=useState();


//   const fetchPosts=async()=>{
//     try
//     {
//       const res=await axios.get(URL+"/api/posts/")
//       console.log(res.data);
//       setPosts(res.data);
//     }
//     catch(err)
//     {
//       console.log(err)
//     }
//   }
//   useEffect(()=>
//   {
//     fetchPosts();
//   },[])
//   return (
//     <>
//         <Navbar/>


//         <div className="px-8 md:px-[200px] min-h-[80vh]">
//       {posts.map((post)=>
//       {
//         <HomePosts key={post._id} post={post}/>
//       })}

//     </div>





//         <Footer/>
//     </>
    
//   )
// }

// export default Home





import { React, useState, useEffect ,useContext} from 'react';
import HomePosts from "../components/HomePosts"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios"
import { URL } from "../Url"
import {useLocation ,Link } from "react-router-dom";
import Loader from '../components/Loader';
import {UserContext} from "../context/UserContext";

const Home = () => {
  const {search} =useLocation();
  const [noResult,setNoResult]=useState(false);
  const [posts, setPosts] = useState([]);
  const [loader,setLoader] =useState(false);
  const {user}=useContext(UserContext);

  // console.log(user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      
      const res = await axios.get(URL + "/api/posts/"+search);
      // console.log(search)
      // console.log(res.data);
      setPosts(res.data);
      if(res.data.length===0)
      {
        setNoResult(true);
      }else{setNoResult(false)
        
      }
      setLoader(false);
    }
    catch (err) {
      console.log(err);
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [search])

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>
        :!noResult?posts.map((post) => (
          <>
            <Link to={user?`/posts/post/${post._id}`:"/login"}><HomePosts key={post._id} post={post} /></Link>
          </>
          
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
      </div>
      <Footer />
    </>
  )
}

export default Home;
