// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface UserPayload {
    ut_mail: string;
    exp: number;
    iat: number;
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

    useEffect(() => {
        const savedToken = localStorage.getItem("jwt");
        if (savedToken) {
            setToken(savedToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
            try {
                const decoded: UserPayload = jwtDecode(savedToken);
                setUser(decoded);
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        const response = await axios.post("http://cesizen-api.localhost/login", {
            ut_mail: email,
            ut_password: password,
        });
        if (response.status === 200 && response.data.token) {
            const jwtToken = response.data.token;
            setToken(jwtToken);
            localStorage.setItem("jwt", jwtToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
            try {
                const decoded: UserPayload = jwtDecode(jwtToken);
                setUser(decoded);
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
    };

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
