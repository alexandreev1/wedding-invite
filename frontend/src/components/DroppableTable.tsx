import { useDroppable } from '@dnd-kit/core';
import type { ITable, IGuest } from '../types/wedding';

export const DroppableTable = ({ table, seatedGuests, onClick }: {
    table: ITable,
    seatedGuests: IGuest[],
    onClick: (tableId: ITable['id']) => void,
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `table-${table.id}`,
        data: { tableId: table.id }
    });

    return (
        <div
            ref={setNodeRef}
            onClick={() => onClick(table.id)}
            className={`relative w-64 h-64 rounded-full flex items-center justify-center cursor-pointer transition-all
        ${isOver ? 'scale-110 shadow-2xl ring-4 ring-yellow-400' : 'bg-white shadow-lg border-2 border-stone-100 hover:border-stone-300'}`}
        >
            <div className="text-center">
                <p className="font-serif text-stone-800">{table.name}</p>
                <p className="text-[10px] uppercase tracking-tighter text-stone-400">Клик для рассадки</p>
            </div>

            {/* Отрисовка всех мест вокруг стола */}
            {[...Array(table.maxSeats)].map((_, i) => {
                const guestAtSeat = seatedGuests.find(g => g.seatNumber === i);
                return (
                    <div
                        key={i}
                        className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
              ${guestAtSeat ? 'cursor-pointer hover:scale-110 ring-2 ring-red-200 hover:ring-red-400' : 'border-dashed'}`}
                        style={{
                            top: `${50 - 65 * Math.cos(2 * Math.PI * i / table.maxSeats)}%`,
                            left: `${50 + 65 * Math.sin(2 * Math.PI * i / table.maxSeats)}%`,
                            transform: 'translate(-50%, -50%)',
                            borderColor: guestAtSeat ? 'transparent' : '#d6d3d1',
                        }}
                    >
                        {guestAtSeat && (
                            <img
                                src={guestAtSeat.avatarUrl}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
