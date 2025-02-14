// src/context/AuthContext.tsx
import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
} from "react";
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

/**
 * Fonction utilitaire pour vérifier si un token est expiré.
 */
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: UserPayload = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        console.error("Erreur lors du décodage du token", error);
        return true;
    }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const getInitialToken = () => {
        const savedToken = localStorage.getItem("jwt");
        if (savedToken && !isTokenExpired(savedToken)) {
            return savedToken;
        }
        return null;
    };

    const [token, setToken] = useState<string | null>(getInitialToken());
    const [user, setUser] = useState<UserPayload | null>(
        token ? jwtDecode(token) : null
    );

    /**
     * Met à jour automatiquement l'en-tête Authorization d'axios
     * lorsque le token change.
     */
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    /**
     * Fonction de déconnexion qui réinitialise le contexte et nettoie le localStorage.
     */
    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
    }, []);

    /**
     * Vérification périodique (toutes les 30 minutes) pour détecter l'expiration du token.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            if (token && isTokenExpired(token)) {
                logout();
            }
        }, 1800000); // 1800000 ms = 30 minutes

        return () => clearInterval(interval);
    }, [token, logout]);

    /**
     * Méthode de login asynchrone.
     */
    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/login_check",
                {
                    username: email,
                    password: password,
                }
            );
            if (response.status === 200 && response.data.token) {
                const jwtToken = response.data.token;
                if (isTokenExpired(jwtToken)) {
                    logout();
                    return;
                }
                setToken(jwtToken);
                localStorage.setItem("jwt", jwtToken);
                const decoded: UserPayload = jwtDecode(jwtToken);
                setUser(decoded);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    };

    /**
     * Intercepteur axios pour gérer les réponses 401 et déconnecter l'utilisateur.
     */
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
        <AuthContext.Provider
            value={{ token, user, login, logout, isAuthenticated }}
        >
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
