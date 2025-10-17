import React from "react";
import Login from "../../services/login.jsx";



const UserLogin = () => {

    return (
        <div>
            <Login
                heading='Login'
                apiEndPoint='/login'
                apiDirection= '/home'
            />
        </div>
    )
}

export default UserLogin    