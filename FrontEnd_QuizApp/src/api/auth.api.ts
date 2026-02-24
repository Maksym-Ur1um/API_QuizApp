import type { LoginRequest } from "../types/auth.types";
import type { AuthResponse } from "../types/auth.types";
import apiClient from "./apiClient";

export const login = async function(loginData:LoginRequest): Promise<AuthResponse> {
    const response =await apiClient.post<AuthResponse>('/Auth/login', loginData)
    return response.data;
}