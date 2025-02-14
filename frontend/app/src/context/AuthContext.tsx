// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface UserPayload {
    username: string;
    exp: number;
    iat: number;
    roles: string[];
}

interface AuthContextType {
    token: string | null;
    user: UserPayload | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserPayload | null>(null);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
    }, []);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: UserPayload = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        } catch (error) {
            console.error("Erreur lors du décodage du token", error);
            return true;
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("jwt");
        if (savedToken) {
            if (isTokenExpired(savedToken)) {
                logout();
            } else {
                setToken(savedToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
                const decoded: UserPayload = jwtDecode(savedToken);
                setUser(decoded);
            }
        }
    }, [logout]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (token && isTokenExpired(token)) {
                logout();
            }
        }, 1800000); 
        console.log(token);
        
        return () => clearInterval(interval);
    }, [token, logout]);

    const login = async (email: string, password: string): Promise<void> => {
        const response = await axios.post("http://cesizen-api.localhost/api/login_check", {
            username: email,
            password: password,
        });
        if (response.status === 200 && response.data.token) {
            const jwtToken = response.data.token;
            if (isTokenExpired(jwtToken)) {
                logout();
                return;
            }
            setToken(jwtToken);
            localStorage.setItem("jwt", jwtToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
            const decoded: UserPayload = jwtDecode(jwtToken);
            setUser(decoded);
        }
    };

    // Interceptor pour gérer le 401 et logout automatique
    useEffect(() => {
        const interceptorId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.response.eject(interceptorId);
        };
    }, [logout]);

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utilisé dans le cadre d'un AuthProvider");
    }
    return context;
};
