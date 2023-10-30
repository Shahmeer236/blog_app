import {createContext, useState,useEffect} from "react";
import axios from "axios";
import {URL} from "../Url";
export const UserContext=createContext({});
export function UserContextProvider({children})
{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        getUser();

    },[])
    const getUser=async()=>
    {
        try{
            const result=await axios.get(URL+"/api/auth/refetch",{withCredentials:true});
            // console.log(result.data);
            setUser(result.data)
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return (<UserContext.Provider value={{user,setUser}}>
{children}
    </UserContext.Provider>)
}