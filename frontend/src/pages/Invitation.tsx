import { useNavigate, useParams } from 'react-router-dom';
import { useWeddingStore } from '../store/useWeddingStore';

const GuestInvite = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const { invitations } = useWeddingStore();

    const invitation = invitations.find((g) => g.token === token);

    const guests = invitation?.guests;

    if (!guests) {
        navigate('*');
        return null;
    }

    const isPair = guests.length > 1;

    if (isPair) {
        return guests.map((guest) => <div>{guest.name}</div>)
    }

    return (
        <div className="p-8 text-center">
            <h2 className="text-3xl font-serif">Приглашение на торжество!</h2>
            <p className="mt-4 text-stone-600">Ваше имя: <span className="font-mono bg-stone-200 px-2">{guests[0].name}</span></p>
            <div className="mt-10 p-6 border border-dashed border-stone-400 rounded-lg">
                Здесь будет опрос и ваше место в зале: стол {guests[0].tableId} и место {guests[0].seatNumber}.
            </div>
        </div>
    );
};

export default GuestInvite;
