import axios from "axios";

const api = axios.create({
    baseURL: "https://medicareapi-dxf6hsargzd0ceer.canadacentral-01.azurewebsites.net/",
    headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
});

export default api;