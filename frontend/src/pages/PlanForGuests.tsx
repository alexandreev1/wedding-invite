import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasePlan from '../components/BasePlan';
import { useWeddingStore } from '../store/useWeddingStore';

function PlanForGuests() {
    const { fetchSeatedGuests, seatedGuests } = useWeddingStore();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSeatedGuests();
    }, []);

    if (!id || (seatedGuests && !seatedGuests.find((g) => g.invitationId === id))) {
        navigate('/');
    }

    return <BasePlan editing={false} />;
}

export default memo(PlanForGuests);
