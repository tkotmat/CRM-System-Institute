import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getRequest = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        handleError(error, "GET", url);
    }
};

export const postRequest = async (url, data = {}) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "POST", url);
    }
};

export const putRequest = async (url, data = {}) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "PUT", url);
    }
};

export const deleteRequest = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        handleError(error, "DELETE", url);
    }
};

const handleError = (error, method, url) => {
    console.error(
        `Ошибка ${method} запроса к ${url}:`,
        error.response?.data || error.message
    );
    throw error;
};
