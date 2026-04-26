import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center text-stone-800 p-4">
            <h1 className="text-5xl font-serif mb-4">Александр & Ольга</h1>
            <p className="text-xl mb-12">11.07.2026 — День нашей свадьбы</p>

            <div className="max-w-md text-center space-y-6 mb-20">
                <p>Мы будем рады видеть вас на нашем торжестве!</p>
                <p className="italic text-stone-500">Здесь будет общая информация о месте и времени...</p>
            </div>

            {/* Секретная зона с кольцами */}
            <div className="flex gap-8 mt-10">
                {/* Кольцо невесты - просто декорация */}
                <div className="w-12 h-12 border-4 border-yellow-400 rounded-full opacity-50 cursor-default" />

                {/* Кольцо жениха - ведет в админку */}
                <button
                    onClick={() => navigate('/admin/auth')}
                    className="w-12 h-12 border-4 border-yellow-500 rounded-full hover:scale-110 transition-transform focus:outline-none"
                    title="Admin Access"
                />
            </div>
        </div>
    );
};

export default Home;
