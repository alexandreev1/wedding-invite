import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useWeddingStore } from '../store/useWeddingStore';
import Button from '../components/Button';

function GuestForm() {
    const { id } = useParams();
    const { fetchGuestData, guestData, patchGuestData } = useWeddingStore();

    const handleSendResultButtonClick = useCallback(() => {
        patchGuestData(
            id,
            JSON.stringify({ data1: true, data2: 'abc', data3: { data31: false, data32: 123 } }),
        );
    }, [id]);

    useEffect(() => {
        fetchGuestData(id);
    }, [id]);

    if (!guestData) {
        return null;
    }

    return (
        <div>
            Привет, {guestData.name}. Твой пол: {guestData.gender}, твой id: {guestData.id}
            <Button caption="Отправить" onButtonClick={handleSendResultButtonClick} />
            {guestData.formResult && (
                <div>
                    <div>Хуяк, ваши данные формы в JSON: {guestData.formResult}</div>
                    <div>А вот они же, но разобранные: {`${JSON.parse(guestData.formResult)}`}</div>
                </div>
            )}
        </div>
    );
}

export default GuestForm;
