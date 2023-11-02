
// import React, { useEffect,useContext } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import {ImCross} from 'react-icons/im'
// import { useState } from 'react'
// import axios from "axios";
// import {URL} from "../Url"
// import { useNavigate, useParams } from "react-router-dom"
// import { UserContext } from "../context/UserContext"



// const EditPost = () => {
//   const postId=useParams().id;
//   const navigate=useNavigate();
//   const [title,setTitle]=useState("");
//   const [desc,setDesc]=useState("");
//   const [file,setFile]=useState(null);

//   const [cat,setCat]=useState("");
//   const [cats,setCats]=useState([]);

//   const {user}=useContext(UserContext)
//   const addCategory = () => {
//     let updatedCats=[...cats];
//     updatedCats.push(cat);
//     setCat("");
//     setCats(updatedCats);

//     // const {user}=useContext(UserContext);
//     // console.log(cats)



//   };

//   const fetchPost=async()=>
//   {
//     try{
//       const res=await axios.get(URL+"/api/posts/"+postId)
//       setTitle(res.data.title);
//       setDesc(res.data.desc);
//       // setCat(res.data.category);
//       setCats(res.data.categories);
//       setFile(res.data.photo);


//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   const deleteCategory = (i) => {
//     let updatedCats=[...cats];
//     updatedCats.splice(i);
//     setCats(updatedCats);

//   };


//   const handleUpdate=async (e)=>{
//     e.preventDefault()
//     const post={
//       title,
//       desc,
//       userName:user.username,
//       userId:user._id,
//       categories:cats
//     }

//     if(file){
//       const data=new FormData()
//       const filename=Date.now()+file.name
//       data.append("img",filename)
//       data.append("file",file)
//       post.photo=filename
//       // console.log(data)
//       //img upload
//       try{
//         const imgUpload=await axios.post(URL+"/api/upload",data)
//         // console.log(imgUpload.data)
//       }
//       catch(err){
//         console.log(err)
//       }
//     }
//     //post upload
//     console.log(post)
//     try{
//       // const res=await axios.post(URL+"/api/posts/",post,{withCredentials:true})
//       const res = await axios.put(URL + "/api/posts/"+postId, post, { withCredentials: true });

//       console.log(res);
//       navigate("/posts/post/"+res.data._id)
//       // console.log(res.data)
//     }
//     catch(err){
//       console.log(err)
//       res.status(500).json(err);
//     }
// }


//   useEffect(()=>
//   {
//     fetchPost();
//   },[postId])

//   return (
//     <div>
//       <Navbar/>
//       <div className='px-5 md:px-[200px] mt-8'>
//         <h3 className='font-bold md:text-2xl text-xl mt-8'>Update a post</h3>
//         <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
//           <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder='Enter Post Title' className='px-4 py-2 outline-none' />
//           <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  className='px-4 ' />
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
//           <textarea onChange={(e)=>{setDesc(e.target.value)}} value={desc} name="" id="" cols="30" rows="15" className='px-4 py-3 outline-none' placeholder='Enter Post Description'/>
//           <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
//         </form>
//       </div>
//       <Footer/>
//     </div>
//   )
// }

// export default EditPost






import React, { useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useState } from 'react';
import axios from 'axios';
import { URL } from '../Url';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);

  const { user } = useContext(UserContext);
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat('');
    setCats(updatedCats);
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + '/api/posts/' + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      // setCat(res.data.category);
      setCats(res.data.categories);
      setFile(res.data.photo);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      userName: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('img', filename);
      data.append('file', file);
      post.photo = filename;
      try {
        const imgUpload = await axios.post(URL + '/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(URL + '/api/posts/' + postId, post, { withCredentials: true });
      console.log(res);
      navigate('/posts/post/' + res.data._id);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className='px-5 md:px-[200px] mt-8'>
        <h3 className='font-bold md:text-2xl text-xl mt-8'>Update a post</h3>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Enter Post Title' className='px-4 py-2 outline-none' />
          <input type='file' onChange={(e) => setFile(e.target.files[0])} className='px-4' />
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
              <input value={cat} onChange={(e) => setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type='text' />
              <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>
                Add
              </div>
            </div>
            {/* categories */}
            <div className='flex px-4 mt-3'>
              {cats?.map((c, i) => (
                <div key={i} className='flex justify-center items-center space-x-2 mt-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ReactQuill
            value={desc}
            onChange={setDesc}
            placeholder='Enter Post Description'
          />
          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
