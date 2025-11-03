import axios from "axios";

const api = axios.create({
    baseURL : 'http://13.48.178.218',
    withCredentials:true
})

export default api