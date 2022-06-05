import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => { checkAuthStatus() }, []);

    // register user
    const register = (user) => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, user)
            .then(res => {
                console.log("new user", res.data.data);
                setUser(res.data.data);
                router.push('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // login user
    const login = (user) => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, user)
            .then(res => {
                checkAuthStatus();
                router.push('/');
            })
            .catch(err => {
                setError(err.response.data.message);

            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // logout user
    const logout = () => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`)
            .then(res => {
                setUser(null);
                router.push('/auth/login');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // check if user is logged in
    const checkAuthStatus = () => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-auth`)
            .then(res => {
                setUser(res.data.data);
            })
            .catch(err => {
                console.log(err.response.data)
                setError(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <AuthContext.Provider value={{ user, error, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;