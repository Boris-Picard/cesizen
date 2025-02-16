import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
    useRef,
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
    isAdmin: boolean | null;
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
 * Vérifie si un token est expiré.
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
    // Référence pour stocker l'ID du timeout de rafraîchissement
    const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

    useEffect(() => {
        if (user?.roles.includes("ROLE_ADMIN")) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [user])

    /**
     * Mise à jour de l'en-tête Authorization d'axios
     */
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    /**
     * Déconnexion : réinitialise le contexte, le localStorage et annule le timeout.
     */
    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
        }
    }, []);

    /**
     * Fonction qui rafraîchit le token avant son expiration.
     * On suppose ici que le backend expose un endpoint `/api/token/refresh`
     * qui renvoie un nouveau token.
     */
    const refreshToken = useCallback(async () => {
        if (!token) return;
        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/token/refresh",
                { token }
            );
            if (response.status === 200 && response.data.token) {
                const newToken = response.data.token;
                if (isTokenExpired(newToken)) {
                    logout();
                    return;
                }
                setToken(newToken);
                localStorage.setItem("jwt", newToken);
                const decoded: UserPayload = jwtDecode(newToken);
                setUser(decoded);
                // Planifie le prochain rafraîchissement avec le nouveau token
                scheduleRefresh(newToken);
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement du token :", error);
            logout();
        }
    }, [token, logout]);

    /**
     * Planifie un rafraîchissement du token en fonction du temps restant avant expiration.
     * On démarre le rafraîchissement 1 minute avant l'expiration effective.
     */
    const scheduleRefresh = useCallback(
        (currentToken: string) => {
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
            try {
                const decoded: UserPayload = jwtDecode(currentToken);
                const expTime = decoded.exp * 1000;
                const now = Date.now();
                const margin = 60000; // 1 minute de marge
                const delay = expTime - now - margin;
                if (delay <= 0) {
                    // Si le délai est négatif, rafraîchir immédiatement
                    refreshToken();
                } else {
                    refreshTimeoutRef.current = setTimeout(() => {
                        refreshToken();
                    }, delay);
                }
            } catch (error) {
                console.error(
                    "Erreur lors du scheduling du rafraîchissement du token",
                    error
                );
            }
        },
        [refreshToken]
    );

    /**
     * Lorsqu'un token est défini, on planifie son rafraîchissement.
     */
    useEffect(() => {
        if (token) {
            scheduleRefresh(token);
        }
    }, [token, scheduleRefresh]);

    /**
     * Fonction de login asynchrone.
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
                // Planifie le rafraîchissement du token
                scheduleRefresh(jwtToken);
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
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, isAdmin }}>
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
