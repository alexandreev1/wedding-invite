import { memo, useEffect } from 'react';
import BasePlan from '../components/BasePlan';
import { useWeddingStore } from '../store/useWeddingStore';

function PlanForGuests() {
    const { fetchSeatedGuests, seatedGuests } = useWeddingStore();

    useEffect(() => {
        fetchSeatedGuests();
    }, []);

    return seatedGuests ? <BasePlan editing={false} /> : null;
}

export default memo(PlanForGuests);
