import React from 'react'
import Login from '../../services/login.jsx'


const AdminLogin = () => {


  return (
    <div>
      
       <Login 
        
        heading='Admin Login'
        apiEndPoint='/admin/login'
        apiDirection= '/admin/home'

       />
       
    </div>
  )
}

export default AdminLogin