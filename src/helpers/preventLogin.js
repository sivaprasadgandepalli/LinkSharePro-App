import React from 'react';
import { useAuth } from '../contexts/auth';
import { Navigate, useLocation } from 'react-router-dom';

export default function PreventLogin({ children }) {
    const { isLogin } = useAuth();
    const location = useLocation();

    if (isLogin()) {
        return <Navigate to={location.pathname} />;
    }

    return children;
}
