import { useMemo } from 'react';
import { TABLES } from '../shared/constants';
import { useWeddingStore } from '../store/useWeddingStore';
import type { IGuest } from '../types/wedding';

interface ITableEditorProps {
    tableId: number | null;
    activeGuestId?: string;
    onGuestClickHandler: (guest: IGuest) => void;
    onEmptySeatClickHandler: (tableId: number, seat: number, guest?: IGuest) => void;
    onCloseHandler: () => void;
}

function TableEditor(props: ITableEditorProps) {
    const { tableId, activeGuestId, onGuestClickHandler, onEmptySeatClickHandler, onCloseHandler } = props;

    const { getAllGuests } = useWeddingStore();
    const allGuests = getAllGuests();

    const currTable = useMemo(() => {
        return TABLES.find((table) => table.id === tableId);
    }, [tableId]);

    if (!currTable || !tableId) {
        return null;
    }

    const activeGuest = useMemo(() => allGuests.find((guest) => guest.id === activeGuestId), [activeGuestId]);

    return (
        <div className="fixed inset-0 bg-stone-900/90 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="relative p-20 bg-stone-50 rounded-full border-[12px] border-stone-200 shadow-2xl">

                {/* Кнопка закрытия */}
                <button
                    onClick={onCloseHandler}
                    className="absolute -top-10 right-0 text-white hover:text-yellow-400 font-bold"
                >
                    ЗАКРЫТЬ
                </button>

                <div className="w-[400px] h-[400px] flex items-center justify-center relative">
                    <h3 className="text-2xl font-serif text-stone-800">{currTable.name}</h3>

                    {[...Array(currTable.maxSeats)].map((_, i) => {
                        const guestAtSeat = allGuests.find(
                            g => g.tableId === currTable.id && g.seatNumber === i
                        );

                        return (
                            !!guestAtSeat ? (
                                <button
                                    key={i}
                                    disabled={!!activeGuestId}
                                    onClick={() => onGuestClickHandler(guestAtSeat)}
                                    className="absolute w-16 h-16 rounded-full border-2 transition-all flex items-center justify-center border-stone-200 opacity-100 bg-white"
                                    style={{
                                        top: `${50 - 60 * Math.cos(2 * Math.PI * i / currTable.maxSeats)}%`,
                                        left: `${50 + 60 * Math.sin(2 * Math.PI * i / currTable.maxSeats)}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <img src={guestAtSeat.avatarUrl} className="w-full h-full rounded-full object-cover" />
                                </button>
                            ) : (
                                <button
                                    key={i}
                                    disabled={!activeGuestId}
                                    onClick={() => onEmptySeatClickHandler(tableId, i, activeGuest)}
                                    className="absolute w-16 h-16 rounded-full border-2 transition-all flex items-center justify-center
                                border-dashed border-stone-400 hover:border-yellow-500 hover:scale-110 hover:bg-yellow-50"
                                    style={{
                                        top: `${50 - 60 * Math.cos(2 * Math.PI * i / currTable.maxSeats)}%`,
                                        left: `${50 + 60 * Math.sin(2 * Math.PI * i / currTable.maxSeats)}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <span className="text-stone-400 text-xs">Место {i + 1}</span>
                                </button>
                            )
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TableEditor;