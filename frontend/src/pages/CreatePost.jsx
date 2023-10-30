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


import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useState } from 'react'

const CreatePost = () => {
  const [cat,setCat]=useState("");
  const [cats,setCats]=useState([]);
  const addCategory = () => {
    let updatedCats=[...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
    // console.log(cats)



  };

  const deleteCategory = (i) => {
    let updatedCats=[...cats];
    updatedCats.splice(i);
    setCats(updatedCats);

  };

  return (
    <div>
      <Navbar/>
      <div className='px-5 md:px-[200px] mt-8'>
        <h3 className='font-bold md:text-2xl text-xl mt-8'>Create a post</h3>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input type="text" placeholder='Enter Post Title' className='px-4 py-2 outline-none' />
          <input type="file"  className='px-4 ' />
          <div className='flex flex-col'>
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e)=>{setCat(e.target.value) }} className='px-4 py-2 outline-none ' placeholder='Enter post catagory' type='text'/>
              <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
            </div>
            {/* catagories */}
            <div className='flex px-4 mt-3'>
              {
                cats?.map((c,i)=>{
                  return(
                    <div key={i} className='flex justify-center items-center space-x-2 mt-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                    <p >{c}</p>
                    <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'> <ImCross/></p>
                  </div>

                  );

                })
              }
            
             
            </div>

          </div>
          <textarea name="" id="" cols="30" rows="15" className='px-4 py-3 outline-none' placeholder='Enter Post Description'/>
          <button className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default CreatePost