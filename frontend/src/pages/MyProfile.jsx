import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Myprofile = () => {

   const {userData,SetUserData,backend_url,loadUserProfileData,token}=useContext(AppContext)
   

  const [isEdit, setisEdit] = useState(false)

  const [image,SetImage]=useState(false)


  const updateUserProfileData=async()=>{
    try{

      const formData=new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',userData.image)

      const {data}=await axios.post(backend_url+'/api/user/update-profile',formData,{headers:{token}})
       
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setisEdit(false)
        SetImage(false)
      }
      else{
        toast.error(data.message)

      }

    }
    catch(error){
      console.log(error.message)
      toast.error(error.message)

    }

  }

 
  

  return userData && (
    <div className='max-w-lg flex flex-col text-sm'>
      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image):userData.image} alt=''/>
            <img className='w-10 absolute bottom-12 right-12' src={image ? '':assets.upload_icon} />
          </div>
          <input onChange={(e)=>SetImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        :<img className='w-36 rounded' src={userData.image} alt="" />
      }
     
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => SetUserData(prev => ({ ...prev, name: e.target.value }))}  />
          : <p className='text-neutral-800 text-3xl font-medium max-w-60 mt-4' >{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div >
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-600'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => SetUserData(prev => ({ ...prev, phone: e.target.value }))}  />
              : <p className='text-blue-600'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>

          {
            isEdit
              ? <p>
                <input className='bg-gray-50' type="text" value={userData.address.line1} onChange={(e) => SetUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <br />
                <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={(e) => SetUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </p>
              : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>

          }


        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e) => SetUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e) => SetUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-20'>
        {
          isEdit
            ? <button className='border border-primary bg-gray-50 text-center rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={updateUserProfileData}>Save Information</button>
            : <button className='border border-primary bg-gray-50 rounded-full text-center  px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setisEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default Myprofile
