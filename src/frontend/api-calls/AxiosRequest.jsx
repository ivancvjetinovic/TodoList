import axios from "axios";
import { ENDPOINT } from "../Constants";

const api = axios.create({
    baseURL: ENDPOINT
})

export default api
