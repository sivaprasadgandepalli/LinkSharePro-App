import React from 'react'
import { useAuth } from '../contexts/auth';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
    const { isLogin } = useAuth();
    if (!isLogin()) {

        return <Navigate to='/' />
    }
    return (
        children
    )
}
