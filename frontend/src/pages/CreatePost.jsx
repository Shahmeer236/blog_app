// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const CreatePost = ({ onContentChange }) => {
//   const [editorContent, setEditorContent] = useState("");

//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline'],
//       [{'list': 'ordered'}, {'list': 'bullet'}],
//     ],
//   };

//   const formats = [
//     'bold', 'italic', 'underline',
//     'list', 'bullet',
//   ];

//   const handleEditorChange = (content) => {
//     setEditorContent(content);
//   };

//   const handleTransferContent = () => {
//     onContentChange(editorContent);
//     console.log(editorContent);
//   };

//   return (
//     <div className="text-editor">
//       <ReactQuill theme="snow" modules={modules} formats={formats} value={editorContent} onChange={handleEditorChange} />
//       <button onClick={handleTransferContent  } >Transfer Content</button>
      
      
//     </div>
//   );
// }

// export default CreatePost;















// import {React,useContext} from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import {ImCross} from 'react-icons/im'
// import { useState } from 'react'
// import {UserContext} from "../context/UserContext"
// import axios from "axios";
// import {Navigate ,useNavigate} from "react-router-dom"
// import {URL} from "../Url";

// const CreatePost = () => {
//   const [title,setTitle]=useState("");
//   const [desc,setDesc]=useState("");
//   const [userName,setUserName]=useState("");
//   const [file,setFile]=useState(null);  //for photo of post
//   const {user}=useContext(UserContext);
  

//   const navigate=useNavigate()

//   const [cat,setCat]=useState("");
//   const [cats,setCats]=useState([]);
//   const addCategory = () => {
//     let updatedCats=[...cats];
//     updatedCats.push(cat);
//     setCat("");
//     setCats(updatedCats);
//     // console.log(cats)



//   };

//   const deleteCategory = (i) => {
//     let updatedCats=[...cats];
//     updatedCats.splice(i);
//     setCats(updatedCats);

//   };

//   const handleCreate=async(e)=>
//   {
//     e.preventDefault();
//     const post={
//       title,
//       desc,
//       userName:user.username,
//       userId:user._id,
//       categories:cats
//     }
//     if(file)
//     {
//       const data=new FormData();
//       const filename=Date.now()+file.img;
//       data.append("img",filename)
//       data.append("file",file)
//       post.photo=filename


// //image upload
//       try{
//         const imageUpload= await axios.post(URL+"/api/upload",data)
//         console.log(imageUpload.data);
//          }
//          catch(err)
//          {
//            console.log(err);
           
//          }
 
//     }
//     //post upload

//     try{
//       const res =await axios.post(URL+"/api/posts/write",post,{withCredentials:true})
//       console.log(res.data);

//       navigate("/posts/post/"+res.data._id);
//     }
//     catch(err)
//     {
//       console.log(err)
//     }
   

//   }


//   return (


//     <div>
//       <Navbar/>
//       <div className='px-5 md:px-[200px] mt-8'>
//         <h3 className='font-bold md:text-2xl text-xl mt-8'>Create a post</h3>
//         <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
//           <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Enter Post Title' className='px-4 py-2 outline-none' />
//           <input  onChange={(e)=>{setCat(e.target.files[0]) }} type="file"  className='px-4 ' />
//           <div className='flex flex-col'>
//             <div className="flex items-center space-x-4 md:space-x-8">
//               <input value={cat} onChange={(e)=>{setCat(e.target.value) }} className='px-4 py-2 outline-none ' placeholder='Enter post catagory' type='text'/>
//               <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
//             </div>
//             {/* catagories */}
//             <div className='flex px-4 mt-3'>
//               {
//                 cats?.map((c,i)=>{
//                   return(
//                     <div key={i} className='flex justify-center items-center space-x-2 mt-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
//                     <p >{c}</p>
//                     <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'> <ImCross/></p>
//                   </div>

//                   );

//                 })
//               }
            
             
//             </div>

//           </div>
//           <textarea onChange={(e)=>{setDesc(e.target.value) }} name="" id="" cols="30" rows="15" className='px-4 py-3 outline-none' placeholder='Enter Post Description'/>
//           <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
//         </form>
//       </div>
//       <Footer/>
//     </div>
//   )
// }

// export default CreatePost






import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../Url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const handleCreate=async (e)=>{
        e.preventDefault()
        const post={
          title,
          desc,
          userName:user.username,
          userId:user._id,
          categories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          // console.log(data)
          //img upload
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            // console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
        console.log(post)
        try{
          // const res=await axios.post(URL+"/api/posts/",post,{withCredentials:true})
          const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });

          console.log(res);
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)

        }
        catch(err){
          console.log(err)
          res.status(500).json(err);
        }
    }



  return (
    <div>
        <Navbar/>
        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl '>Create a post</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div>

            {/* categories */}
            <div className='flex px-4 mt-3'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div>
          
<ReactQuill theme="snow" value={desc} onChange={setDesc} />



          {/* <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/> */}
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
        </form>

        </div>
        <Footer/>
    </div>
  )
}

export default CreatePost