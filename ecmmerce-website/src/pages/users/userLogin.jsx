import React from "react";
import Login from "../../services/login.jsx";



const UserLogin = () => {

    return (
        <div>
            <Login
                heading='Login'
                apiEndPoint='/api/login'
                apiDirection= '/'
            />
        </div>
    )
}

export default UserLogin    