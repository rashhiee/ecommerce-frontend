import axios from "axios";

const api = axios.create({
    baseURL : 'http://shoeboxee.duckdns.org',
    withCredentials:true
})

export default api