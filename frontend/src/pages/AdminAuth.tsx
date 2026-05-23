import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                setTimeout(() => setError(false), 2000);
                setPin('');
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
                    {error ? 'НЕВЕРНЫЙ ПИН' : isVerifying ? 'ПРОВЕРКА...' : 'ADMIN ACCESS'}
                </h2>

                <input
                    type="password"
                    value={pin}
                    disabled={isVerifying}
                    onChange={(e) => handleInput(e.target.value)}
                    className={`bg-transparent border-b-2 text-center text-5xl tracking-[0.5em] w-64 outline-none transition-all pb-2 ${
                        error
                            ? 'border-red-500 text-red-500'
                            : 'border-stone-700 focus:border-yellow-500 text-white'
                    } disabled:opacity-50`}
                    autoFocus
                />

                {/* Точки для визуализации ввода */}
                <div className="flex gap-4 mt-8">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                i < pin.length ? 'bg-yellow-500 scale-125' : 'bg-stone-800'
                            } ${error ? 'bg-red-500' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
