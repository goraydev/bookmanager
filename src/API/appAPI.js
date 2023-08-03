import axios from "axios";

import { getEnvariables } from "../helpers/getEnvariables";

const { VITE_API_URL } = getEnvariables();


const appAPI = axios.create({

    baseURL: VITE_API_URL,
})


//Configurar intercepetores 


export default appAPI;