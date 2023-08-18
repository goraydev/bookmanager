import axios from "axios";
import { getEnvariables } from "../helpers/getEnvariables";


const { VITE_API_URL } = getEnvariables();


const appAPI = axios.create({

    baseURL: VITE_API_URL,
})


//Configurar intercepetores 
appAPI.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
    return config;
})

export default appAPI;