import axios from "axios";

const BASE_URL = "https://localhost:7032";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Универсальный GET
export const getRequest = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        handleError(error, "GET", url);
    }
};

// Универсальный POST
export const postRequest = async (url, data = {}) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "POST", url);
    }
};

// Универсальный PUT
export const putRequest = async (url, data = {}) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error, "PUT", url);
    }
};

// Универсальный DELETE
export const deleteRequest = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        handleError(error, "DELETE", url);
    }
};

// Обработчик ошибок
const handleError = (error, method, url) => {
    console.error(
        `Ошибка ${method} запроса к ${url}:`,
        error.response?.data || error.message
    );
    throw error;
};
