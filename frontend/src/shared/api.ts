import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

// Функция для установки админ-сессии
export const setAdminAuth = (pin: string) => {
    api.defaults.headers.common['x-admin-pin'] = pin;
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            // Очищаем заголовки и редиректим
            delete api.defaults.headers.common['x-admin-pin'];
            window.location.href = '/admin/auth';
        }
        return Promise.reject(error);
    }
);