import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* Left (Image) */}
    <div className="w-[35%] h-[200px] relative">
      <img
        src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="h-full w-full object-cover rounded-lg"
      />
      <div className="absolute bottom-4 left-4">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQGhZ21jfXrZSA/profile-displayphoto-shrink_200_200/0/1689365280630?e=1703116800&v=beta&t=Dj4VFhWkE1LcEU5RaV_BdnRHEMTYLRWlboEb6eaiGVc"
          alt=""
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </div>
    {/* Right */}
    <div className="flex flex-col w-[65%]">
      
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">10 uses of Artificial intelligence in Day to day life</h1>
      <div className="flex items-center mb-2 text-sm font-semibold text-gray-500">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQGhZ21jfXrZSA/profile-displayphoto-shrink_200_200/0/1689365280630?e=1703116800&v=beta&t=Dj4VFhWkE1LcEU5RaV_BdnRHEMTYLRWlboEb6eaiGVc"
          alt=""
          className="w-6 h-6 rounded-full border-2 border-white"
        />
        <p>@shahmeerRizwan</p>
      </div>
      <div className="flex mb-2 text-sm items-center justify-between md:mb-4">
        <div className="flex space-x-2">
          <p>10/20/2023</p>
          <p>10:47</p>
        </div>
      </div>
      <p className="text-sm md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, modi aut magni accusantium sit ex ab repellendus ad labore. Repudiandae accusamus modi sapiente cumque sit hic numquam harum, molestias officia.</p>
    </div>
  </div>
  )
}

export default ProfilePosts