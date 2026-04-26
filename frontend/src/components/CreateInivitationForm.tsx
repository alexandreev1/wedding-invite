import { memo, useState } from "react";
import type { IGuest, TGender } from "../types/wedding";
import { useWeddingStore } from "../store/useWeddingStore";
import { generateToken, getAvatarUrl } from "../shared/utils";

function CreateInvitationForm() {
    const { addInvitation } = useWeddingStore();
    const [isPair, setIsPair] = useState(false);
    const [guest1, setGuest1] = useState({ name: '', gender: 'male' as TGender, photo: '' });
    const [guest2, setGuest2] = useState({ name: '', gender: 'female' as TGender, photo: '' });

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setter((prev: any) => ({ ...prev, photo: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const invitationId = crypto.randomUUID();

        const guests: IGuest[] = [{
            id: crypto.randomUUID(),
            invitationId: invitationId,
            name: guest1.name,
            gender: guest1.gender,
            avatarUrl: guest1.photo || getAvatarUrl(guest1.name), // Если нет фото, берем Boring Avatars
            tableId: null,
            seatNumber: null
        }];

        if (isPair) {
            guests.push({
                id: crypto.randomUUID(),
                invitationId: invitationId,
                name: guest2.name,
                gender: guest2.gender,
                avatarUrl: guest2.photo || getAvatarUrl(guest2.name),
                tableId: null,
                seatNumber: null
            });
        }

        addInvitation({
            id: invitationId,
            token: generateToken(guest1.name),
            guests,
            isRSVP: false
        });
    };

    return (
        <form onSubmit={submit} className="p-4 space-y-4 border-b">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-stone-400">
                <span>Тип приглашения</span>
                <button
                    type="button"
                    onClick={() => setIsPair(!isPair)}
                    className={`px-3 py-1 rounded-full transition ${isPair ? 'bg-yellow-500 text-white' : 'bg-stone-200'}`}
                >
                    {isPair ? 'Пара' : 'Один'}
                </button>
            </div>

            {/* Гость 1 */}
            <div className="space-y-2 p-2 border rounded bg-stone-50">
                <input
                    placeholder="Имя гостя"
                    className="w-full text-sm p-1 border-b bg-transparent outline-none"
                    value={guest1.name}
                    onChange={e => setGuest1({ ...guest1, name: e.target.value })}
                />
                <div className="flex justify-between items-center">
                    <select
                        value={guest1.gender}
                        onChange={e => setGuest1({ ...guest1, gender: e.target.value as TGender })}
                        className="text-[10px] border p-1 rounded"
                    >
                        <option value="male">М</option>
                        <option value="female">Ж</option>
                    </select>
                    <input type="file" accept="image/*" onChange={e => handlePhoto(e, setGuest1)} className="hidden" id="p1" />
                    <label htmlFor="p1" className="text-[10px] cursor-pointer text-blue-500 underline">{guest1.photo ? 'Сменить фото' : 'Фото'}</label>
                    {guest1.photo && <div className="w-6 h-6 rounded-full overflow-hidden border"><img src={guest1.photo} /></div>}
                </div>
            </div>

            {/* Гость 2 (показываем только если isPair) */}
            {isPair && (
                <div className="space-y-2 p-2 border rounded bg-pink-50/30 animate-in fade-in slide-in-from-top-1">
                    <input
                        placeholder="Имя +1"
                        className="w-full text-sm p-1 border-b bg-transparent outline-none"
                        value={guest2.name}
                        onChange={e => setGuest2({ ...guest2, name: e.target.value })}
                    />
                    <div className="flex justify-between items-center">
                        <select
                            value={guest2.gender}
                            onChange={e => setGuest2({ ...guest2, gender: e.target.value as TGender })}
                            className="text-[10px] border p-1 rounded"
                        >
                            <option value="female">Ж</option>
                            <option value="male">М</option>
                        </select>
                        <input type="file" accept="image/*" onChange={e => handlePhoto(e, setGuest2)} className="hidden" id="p2" />
                        <label htmlFor="p2" className="text-[10px] cursor-pointer text-blue-500 underline">{guest2.photo ? 'Сменить фото' : 'Фото'}</label>
                        {guest2.photo && <div className="w-6 h-6 rounded-full overflow-hidden border"><img src={guest2.photo} /></div>}
                    </div>
                </div>
            )}

            <button type="submit" className="w-full py-2 bg-stone-800 text-white rounded text-sm font-bold hover:bg-stone-700">
                Создать приглашение
            </button>
        </form>
    )
}

export default memo(CreateInvitationForm);