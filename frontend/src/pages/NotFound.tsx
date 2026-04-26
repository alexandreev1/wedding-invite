import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-stone-100 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-9xl font-serif text-stone-300">404</h1>
            <div className="mt-4 space-y-2">
                <h2 className="text-2xl font-medium text-stone-800">Упс! Страница не найдена</h2>
                <p className="text-stone-500">Похоже, этот путь не ведет к алтарю.</p>
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-8 px-6 py-2 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-all rounded-full"
            >
                Вернуться на главную
            </button>
        </div>
    );
};

export default NotFound;
