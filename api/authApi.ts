import axios from "axios"
import apiClient from "./apiClient"

const createApiFunction = (method: "get" | "post" | "put" | "delete", url: string) => async (data?: object) => {
    try {
        const response = await apiClient({
            method,
            url: `/api/auth/${url}`,
            data,
        })
        return response.data
    } catch (error: any) {
        throw error.response?.data || error
    }
}

export default function AuthApi() {
    return {
        register: createApiFunction("post", "register"),
        login: createApiFunction("post", "login"),
        googleLogin: createApiFunction("get", "google/login"),
    }
}