import { useState, useEffect } from "react";
import pb from '../utils/pb'

export const useProfile = () => {
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);
    const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
            setIsAuthenticated(!!token && !!model?.email)
        });
    }, []);

    return { token, user, isAuthenticated }
};

export default useProfile