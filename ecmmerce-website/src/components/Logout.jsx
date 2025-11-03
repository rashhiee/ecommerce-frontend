import React, { useState ,useEffect } from 'react'
import api from '../services/axios'
import { useNavigate } from 'react-router-dom'


const Logout = () => {

    const navigate = useNavigate();
    useEffect(() => {
       async function getter() {
         const res = await api.post('/api/logout')
         alert('logout successfull')
         navigate('/home')
       }
       getter()
    },[])

  return (
    <div>Logout</div>
  )
}

export default Logout