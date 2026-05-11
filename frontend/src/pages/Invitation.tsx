import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { IInvitation } from '../types/wedding';
import { api } from '../shared/api';
import { FullScreenLoader } from '../shared/ui/Spinner';

const GuestInvite = () => {
    const { token } = useParams();
    const [invite, setInvite] = useState<IInvitation | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadInvite = async () => {
            try {
                const res = await api.get(`/invitation-by-token/${token}`);
                setInvite(res.data);
            } catch (err) {
                setError(true);
            }
        };
        loadInvite();
    }, [token]);

    if (error) return <div>Извините, приглашение не найдено или ссылка неверна.</div>;
    if (!invite) return <FullScreenLoader />;

    const guestNames = invite.guests.map(g => g.name).join(' и ');

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center py-20 px-6">
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* Шапка приглашения */}
                <header className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h2 className="text-stone-400 uppercase tracking-[0.3em] text-sm font-bold">Приглашение на свадьбу</h2>
                    <h1 className="text-5xl md:text-7xl font-serif text-stone-800 tracking-tight">
                        {guestNames}
                    </h1>
                    <div className="w-24 h-px bg-yellow-500 mx-auto mt-8" />
                </header>

                {/* Текст приглашения */}
                <section className="text-xl leading-relaxed text-stone-600 font-serif italic">
                    <p>Мы будем счастливы разделить с вами <br /> радость этого особенного дня!</p>
                </section>

                {/* Дата и место */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-y border-stone-200">
                    <div>
                        <h3 className="uppercase text-xs font-bold text-stone-400 mb-2">Когда</h3>
                        <p className="text-xl text-stone-800 font-medium">07 Июля 2025</p>
                        <p className="text-stone-500">в 16:00</p>
                    </div>
                    <div>
                        <h3 className="uppercase text-xs font-bold text-stone-400 mb-2">Где</h3>
                        <p className="text-xl text-stone-800 font-medium">Вилла "Отрада"</p>
                        <p className="text-stone-500">Морская наб., 12</p>
                    </div>
                </section>

                {/* Кнопка RSVP (пока заглушка) */}
                <button className="bg-stone-800 text-white px-12 py-4 rounded-full text-lg hover:bg-stone-700 transition-all shadow-xl hover:shadow-2xl">
                    Подтвердить присутствие
                </button>
            </div>
        </div>
    );
};

export default GuestInvite;
