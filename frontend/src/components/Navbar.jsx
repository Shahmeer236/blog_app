import { React, useContext } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";



const Navbar = () => {
  const [prompt,setPrompt]=useState();
  const [menu, setMenu] = useState(false);
  const { user } = useContext(UserContext);
  const navigate=useNavigate();
  const path=useLocation().pathname;
 
  // console.log("usersss:", user);

  const showMenu = () => {
   
    setMenu(!menu);
  };
  return (
    <div className="flex item-center justify-between px-6 md:px-[200px] py-4 ">
      <h1 className="text-lg md:text-xl font-extrabold ">
        <Link to="/">Blogies</Link>
      </h1>
     {path==="/"&& <div className="flex justify-center items-center space-x-0">
        <p className="cursor-pointer" onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}>
          <BiSearch />
        </p>
        <input
          className="outline-none  px-3 py-1 "
          type="text"
          placeholder="Search a post"
          name=""
          id=""
          onChange={(e)=>{setPrompt(e.target.value)}}
        />
      </div>}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/create">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/Login">Login</Link>
          </h3>
        )}
        {user ? (
          <div className="" onClick={showMenu}>
            <p className="cursor-pointer relative ">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/Register">Register</Link>
          </h3>
        )}
      </div>
      <div className="md:hidden text-lg" onClick={showMenu}>
        <p className="cursor-pointer relative ">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;



// import React, { useContext, useEffect, useState, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { BiSearch } from "react-icons/bi";
// import { FaBars } from "react-icons/fa";
// // import { useState } from "react";
// import Menu from "./Menu";
// import { UserContext } from "../context/UserContext";

// const Navbar = () => {
//   const [prompt, setPrompt] = useState("");
//   const [menu, setMenu] = useState(false);
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const path = useLocation().pathname;
//   const menuRef = useRef(null);

//   // Close the menu when a click occurs outside of the menu
//   useEffect(() => {
//     function handleOutsideClick(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenu(false);
//       }
//     }

//     window.addEventListener("click", handleOutsideClick);
//     return () => {
//       window.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   // Open the menu when the hamburger icon is clicked
//   const showMenu = () => {
//     setMenu(!menu);
//   };

//   return (
//     <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
//       <h1 className="text-lg md:text-xl font-extrabold">
//         <Link to="/">Blogies</Link>
//       </h1>
//       {path === "/" && (
//         <div className="flex justify-center items-center space-x-0">
//           <p
//             className="cursor-pointer"
//             onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
//           >
//             <BiSearch />
//           </p>
//           <input
//             className="outline-none px-3 py-1"
//             type="text"
//             placeholder="Search a post"
//             name=""
//             id=""
//             onChange={(e) => {
//               setPrompt(e.target.value);
//             }}
//           />
//         </div>
//       )}
//       <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
//         {user ? (
//           <h3>
//             <Link to="/create">Write</Link>
//           </h3>
//         ) : (
//           <h3>
//             <Link to="/Login">Login</Link>
//           </h3>
//         )}
//         {user ? (
//           <div className="" onClick={showMenu}>
//             <p className="cursor-pointer relative">
//               <FaBars />
//             </p>
//             {menu && <Menu />}
//           </div>
//         ) : (
//           <h3>
//             <Link to="/Register">Register</Link>
//           </h3>
//         )}
//       </div>
//       <div className="md:hidden text-lg" onClick={showMenu} ref={menuRef}>
//         <p className="cursor-pointer relative">
//           <FaBars />
//         </p>
//         {menu && <Menu />}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
