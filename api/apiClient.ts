import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_LOCALHOST_URL

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem('refresh_token')
        ) {
            originalRequest._retry = true
            try {
                const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {
                    refresh_token: localStorage.getItem('refresh_token')
                })
                
                const { access_token } = res.data
                localStorage.setItem('access_token', access_token)

                originalRequest.headers.Authorization = `Bearer ${access_token}`
                return apiClient(originalRequest)
            } catch (error) {
                console.log(error)
                localStorage.clear()
                window.location.href = '/page'
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient