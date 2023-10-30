import React from 'react'
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
const Comments = () => {
  return (
    <div className="py-2 px-2 bg-gray-200 rounded-lg my-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-600 ">@shahmeerRizwan</h3>
                  <div className="flex justify-center items-center space-x-4">
                      <p className="bg-gray-300 text-sm">10/20/2023</p>
                      <p className="bg-gray-300 text-sm">10:47</p>
                      <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer"><BiEdit/></p>
                        <p className="cursor-pointer" ><MdDelete/></p>
                      </div>
                  </div>
               </div>
              <p className="px-4 mt-2 " >Nice Information</p>
     </div>
  )
}

export default Comments