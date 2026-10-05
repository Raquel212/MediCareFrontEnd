import axios from "axios";

const api = axios.create({
    baseURL: "https://medicareapi-dxf6hsargzd0ceer.canadacentral-01.azurewebsites.net/",
});

// Anexa o token atual (lido dinamicamente) a cada requisição,
// garantindo que o login feito em tempo de execução seja respeitado.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
