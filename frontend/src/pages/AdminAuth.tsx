import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const CORRECT_PIN = '1234'; // В будущем вынесем в .env

    const handleInput = (val: string) => {
        if (val.length <= 4) setPin(val);
        if (val === CORRECT_PIN) {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-6 font-mono">Введите PIN-код</h2>
            <input
                type="password"
                value={pin}
                onChange={(e) => handleInput(e.target.value)}
                className="bg-transparent border-b-2 border-white text-center text-4xl tracking-[1em] w-48 outline-none focus:border-yellow-500 transition-colors"
                autoFocus
            />
        </div>
    );
};

export default AdminAuth;
