import React, { useState, useEffect } from 'react'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'


const Logout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    async function getter() {
      try {
        const res = await api.post('/logout')
        toast.success('logout successfull')
        //  alert('logout successfull')
        navigate('/home')
      } catch (error) {
        console.log(error)
      }

    }
    getter()
  }, [])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>Logout</div>
    </>
  )
}

export default Logout