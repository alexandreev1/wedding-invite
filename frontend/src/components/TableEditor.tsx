import { useMemo } from 'react';
import { TABLES } from '../shared/constants';
import { useWeddingStore } from '../store/useWeddingStore';
import type { IGuest } from '../types/wedding';

interface ITableEditorProps {
    tableId: number | null;
    activeGuestId?: string;
    onGuestClickHandler: (guest: IGuest) => void;
    onEmptySeatClickHandler: (tableId: number, seat: number, guest?: IGuest) => void;
}

function TableEditor(props: ITableEditorProps) {
    const { tableId, activeGuestId, onGuestClickHandler, onEmptySeatClickHandler } = props;
    const { getAllGuests } = useWeddingStore();
    const allGuests = getAllGuests();

    const currTable = useMemo(() => TABLES.find((t) => t.id === tableId), [tableId]);

    const activeGuest = useMemo(
        () => allGuests.find((g) => g.id === activeGuestId),
        [activeGuestId, allGuests],
    );

    if (!currTable || !tableId) {
        return null;
    }

    // Функция отрисовки кнопки места
    const SeatButton = ({ seatNum }: { seatNum: number }) => {
        const guestAtSeat = allGuests.find(
            (g) => g.tableId === currTable.id && g.seatNumber === seatNum,
        );

        return guestAtSeat ? (
            <button
                disabled={!!activeGuestId}
                onClick={() => onGuestClickHandler(guestAtSeat)}
                className="w-20 h-20 rounded-full border-2 border-stone-200 bg-white shadow-md flex items-center justify-center transition-transform hover:scale-105"
            >
                <img
                    src={guestAtSeat.avatarUrl}
                    className="w-full h-full rounded-full object-cover"
                />
            </button>
        ) : (
            <button
                disabled={!activeGuestId}
                onClick={() => onEmptySeatClickHandler(tableId, seatNum, activeGuest)}
                className="w-20 h-20 rounded-full border-2 border-dashed border-stone-400 bg-stone-100/50 flex items-center justify-center transition-all hover:border-yellow-500 hover:bg-yellow-50 disabled:opacity-50"
            >
                <span className="text-[10px] text-stone-500 uppercase font-bold">
                    Место {seatNum}
                </span>
            </button>
        );
    };

    return (
        // Внутри TableEditor.tsx заменим разметку:
        <div className="flex items-center gap-12">
            {/* ЛЕВЫЙ РЯД (1 и 2 место) */}
            <div className="flex flex-col gap-10">
                {Array(currTable.maxSeats / 2)
                    .fill(null)
                    .map((_el, index) => (
                        <SeatButton key={index} seatNum={3} />
                    ))}
            </div>

            {/* СТОЛ (Вертикальный) */}
            <div className="relative w-40 h-64 bg-white border-4 border-stone-200 rounded-xl flex items-center justify-center">
                <h3 className="text-xl font-serif rotate-90 whitespace-nowrap">{currTable.name}</h3>
            </div>

            {/* ПРАВЫЙ РЯД (3 и 4 место) */}
            <div className="flex flex-col gap-10">
                <SeatButton seatNum={3} />
                <SeatButton seatNum={4} />
            </div>
        </div>
    );
}

export default TableEditor;
