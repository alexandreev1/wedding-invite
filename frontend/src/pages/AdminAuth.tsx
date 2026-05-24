import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PinInput } from '@mantine/core';
import { api } from '../shared/api';
import { useWeddingStore } from '../store/useWeddingStore';

const AdminAuth = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();
    const fetchInvitations = useWeddingStore((state) => state.fetchInvitations);

    const handleInput = async (val: string) => {
        if (val.length <= 4) {
            setPin(val);
        }
        if (val.length === 4) {
            setIsVerifying(true);
            try {
                // Отправляем ПИН для установки куки
                await api.post('/admin/login', { pin: val });

                // Если ок — грузим данные и идем в дашборд
                await fetchInvitations();
                navigate('/admin/dashboard');
            } catch (err) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setPin('');
                }, 4000);
            } finally {
                setIsVerifying(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center p-4">
            <div
                className={`flex flex-col items-center transition-transform ${error ? 'animate-shake' : ''}`}
            >
                <h2
                    className={`text-2xl mb-8 font-mono tracking-widest ${error ? 'text-red-500' : 'text-stone-400'}`}
                >
                    {error ? 'WRONG PIN' : isVerifying ? 'CHECKING...' : 'ADMIN ACCESS'}
                </h2>

                <PinInput
                    value={pin}
                    onChange={handleInput}
                    error={error}
                    size="xl"
                    length={4}
                    type="number"
                    inputMode="numeric"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default AdminAuth;
