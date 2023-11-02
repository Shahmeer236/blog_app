// import { BiEdit } from "react-icons/bi"
// import { MdDelete } from "react-icons/md"
// import {useParams} from 'react-router-dom';
// import Footer from "../components/Footer"
// import Navbar from "../components/Navbar"
// import Comments from "../components/Comments"
// import axios from 'axios';
// import {URL} from '../Url';
// import {useEffect,useState} from "react";
// const PostDetails = () => {

//   const postId=useParams().id;
//   console.log("post", postId);
//   const [post,setPost]=useState({})

//   const fetchPost=async()=>{

//         const fetchPost = async () => {
//           try {
//             const res = await axios.get(URL + "/api/posts/" + postId);
//             console.log("data", res.data);
//             setPost(res.data);
//           } catch (error) {
//             console.error("Error fetching post:", error);
//           }
//         }

//   useEffect(() => {
//     console.log("post", post); // Moved the console.log here
//   }, [post]);

//   useEffect(()=>{
//     fetchPost()

//   },[postId])

// }
//   return (

//     <>
//         <Navbar/>

//         <div className="px-8 md:px-[200px] mt-8">
//           <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
//               <div className="flex items-center justify-center space-x-2">
//                       <p className="cursor-pointer"><BiEdit/></p>
//                       <p className="cursor-pointer" ><MdDelete/></p>
//               </div>
//           </div>
//           <div className="flex items-center justify-between mt-2 md:mt-4">
//             <p>@shahmeerRizwan</p>
//             <div className="flex space-x-2">
//                 <p>10/20/2023</p>
//                 <p>10:47</p>
//             </div>
//           </div>
//           <img src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full  mx-auto mt-8" alt=""/>
//           <p className="mx-auto mt-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, modi aut magni accusantium sit ex ab repellendus ad labore. Repudiandae accusamus modi sapiente cumque sit hic numquam harum, molestias officia.</p>
//           <div className="flex items-center mt-8 space-x-4 font-semibold">
//               <p>Categories:</p>
//               <div className="flex justify-center items-center space-x-2">

//                 <div  className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
//                 <div  className="bg-gray-300 rounded-lg px-3 py-1">AI</div>

//               </div>
//           </div>
//           <div className="flex flex-col mt-4">
//             <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
//             {/* comments */}
//             <Comments/>
//             <Comments/>
//             <Comments/>
//             <Comments/>

//             {/* write a comment */}
//             <div className="w-full flex flex-col mt-4 md:flex-row">
//               <input  type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
//               <button  className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
//             </div>
//           </div>

//     </div>
//     <Footer/>
//     </>

//   )
// }

// export default PostDetails

import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments";
import axios from "axios";
import { URL, IF } from "../Url";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
  const postId = useParams().id;
  // console.log("post", postId);
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchPost = async () => {
    // setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log("data", res.data);
      setPost(res.data);
      // setLoader(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      // setLoader(true);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // const fetchPostComments = async () => {
  //   try {
  //     const res = await axios.get(URL + "/api/comments/post/" + postId);
  //     console.log("Comments API response:", res.data); // Log the API response
  //   const newComments = res.data; // New comments from the response
  //   console.log("New comments:", newComments); // Log the new comments
  //   // setComments(newComments); // Update the comments state

  //   setComments([...comments,{ comments}]);


  //     // console.log(postId);
  //     // console.log(res.data);
  //     // setComments(res.data);
  //     // // setComments([...res.data]);

  //     // console.log("mycomment",comments)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const fetchPostComments = async () => {
    // setLoader(true)
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments([...comments,res.data]); // New comments from the response
      // setComments([comments,newComments]); // Update the comments state with the new comments
    } catch (err) {
      setLoader(true)
      console.log(err);
    }
  };
  

  useEffect(() => {
    // console.log("post", post); // Moved the console.log here

    fetchPostComments();
  }, [postId]);

  // const postComment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       URL + "/api/comments/create",
  //       {
  //         comment: comment,
  //         author: user.username,
  //         postId: postId,
  //         userId: user._id,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(res);
  //     fetchPostComments();

  //     // fetchPostComments()
  //     // setComment("")
  //     // window.location.reload(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,

        },
        {withCredentials:true})
        window.location.reload(true)
      
      console.log(res);
  
      // Fetch comments again after successfully posting a new comment
      // fetchPostComments();
  
      // Reset the comment input field
      // setComment("");
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <Navbar />

      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer">
                  <MdDelete
                    className="cursor-pointer"
                    onClick={handleDeletePost}
                  />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.userName}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img
            src={post.photo ? IF + post.photo : "fallback-image-url.jpg"}
            className="w-full mx-auto mt-8"
            alt=""
          />
          {/* <p className="mx-auto mt-8">{post.desc}</p> */}
          <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>

          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
          {post.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            </>
            
          ))}
            
          </div>
         </div>
         <div className="flex flex-col mt-4">
         <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
         {comments?.map((c)=>(
          <Comments key={c._id} c={c} post={post} />
         ))}
           
         </div>
            {/* write a comment */}

            <div className="w-full flex flex-col mt-4 md:flex-row">
              <input
                type="text"
                placeholder="Write a comment"
                className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
                onClick={postComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        
      )}
      <Footer />
    </>
  );
};

export default PostDetails;
