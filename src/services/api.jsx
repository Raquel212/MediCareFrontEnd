import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5178/",
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;