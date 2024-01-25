import axios from "axios";

export const bancoApi = axios.create({
    baseURL: 'http://localhost:8080/api/banco/'
});