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

    // Определяем наличие торцевых мест (только для крайних столов в ряду Б)
    const hasTopEnd = table.id === 6; // Верхний торец
    const hasBottomEnd = table.id === 9; // Нижний торец

    return (
        <div
            ref={setNodeRef}
            onClick={() => onClick(table.id)}
            // w-32 h-24 создает прямоугольник 4:3 или 3:2, при стыковке в колонну получится длинный ряд
            className={`relative w-48 h-24 flex items-center justify-center cursor-pointer transition-all
                border-x-2 border-stone-300 -mt-[2px] first:border-t-2 last:border-b-2 first:rounded-t-lg last:rounded-b-lg
                ${isOver ? 'bg-yellow-50 z-10 ring-2 ring-yellow-400' : 'bg-white hover:bg-stone-50'}`}
        >
            <span className="text-[10px] font-serif text-stone-400">Стол {table.id}</span>

            {/* Места по бокам (Длинные стороны стола теперь СЛЕВА и СПРАВА) */}
            <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                {/* Левая сторона (места 1 и 2) */}
                <div className="flex flex-col gap-2">
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 1)} />
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 2)} />
                </div>
                {/* Правая сторона (места 3 и 4) */}
                <div className="flex flex-col gap-2">
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 3)} />
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 4)} />
                </div>
            </div>

            {/* Торцевые места для Ряда Б */}
            {hasTopEnd && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 5)} />
                </div>
            )}
            {hasBottomEnd && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <MiniSeat guest={seatedGuests.find(g => g.seatNumber === 5)} />
                </div>
            )}
        </div>
    );
};

const MiniSeat = ({ guest }: { guest?: IGuest }) => (
    <div className={`w-6 h-6 rounded-full border ${guest ? 'border-yellow-500 bg-yellow-100' : 'border-dashed border-stone-300 bg-white'}`}>
        {guest && <img src={guest.avatarUrl} className="w-full h-full rounded-full" />}
    </div>
);
