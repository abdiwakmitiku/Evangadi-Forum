import axios from "axios"

const axiosBase = axios.create({
    baseURL: "http://localhost:4500/api"
})

export default axiosBase