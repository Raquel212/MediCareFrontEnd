import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5178/",
    headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
});

export default api;