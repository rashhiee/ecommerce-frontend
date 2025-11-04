import axios from "axios";

const api = axios.create({
    baseURL : 'https://shoeboxee.duckdns.org',
    withCredentials:true
})

export default api