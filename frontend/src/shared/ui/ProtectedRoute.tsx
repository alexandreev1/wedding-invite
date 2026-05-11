import { Navigate } from 'react-router-dom';
import { useEffect, useState, type JSX } from 'react'
import { useWeddingStore } from '../../store/useWeddingStore';
import { FullScreenLoader } from './Spinner';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAdmin, fetchInvitations } = useWeddingStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Пытаемся загрузить данные. 
            // Если кука валидна — isAdmin станет true автоматически в fetchInvitations
            try {
                await fetchInvitations();
            } catch (e) {
                // Ошибка 403 или любая другая — isAdmin останется false
            } finally {
                setIsChecking(false);
            }
        };

        // Если мы уже знаем, что админ (перешли с логина), не проверяем заново
        if (!isAdmin) {
            checkAuth();
        } else {
            setIsChecking(false);
        }
    }, [isAdmin, fetchInvitations]);

    if (isChecking) return <FullScreenLoader />;

    if (!isAdmin) {
        return <Navigate to="/admin/auth" replace />;
    }

    return children;
};
