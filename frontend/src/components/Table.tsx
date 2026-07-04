import { Text } from '@mantine/core';
import type { ITable, IGuest } from '../types/wedding';
import { useCallback } from 'react';

export const Table = ({
    table,
    seatedGuests,
    onClick,
}: {
    table: ITable;
    seatedGuests: IGuest[];
    onClick: (id: ITable['id']) => void;
}) => {
    const handleRootClick = useCallback(() => onClick(table.id), [onClick, table.id]);

    return (
        <div className="flex gap-1 cursor-pointer" onClick={handleRootClick}>
            <div className="flex flex-col justify-evenly">
                {Array(table.maxSeats / 2)
                    .fill(null)
                    .map(() => {
                        return <MiniSeat guest={seatedGuests.find((g) => g.seatNumber === 1)} />;
                    })}
            </div>
            <div className="h-96 w-12 bg-white border border-stone-300 rounded-md flex items-center justify-center">
                <Text className="h-min" size="xs" span>
                    {table.id}
                </Text>
            </div>
            <div className="flex flex-col justify-evenly">
                {Array(table.maxSeats / 2)
                    .fill(null)
                    .map(() => {
                        return <MiniSeat guest={seatedGuests.find((g) => g.seatNumber === 1)} />;
                    })}
            </div>
        </div>
    );
};

const MiniSeat = ({ guest }: { guest?: IGuest }) => (
    <div
        className={`w-6 h-6 rounded-full border ${guest ? 'border-yellow-500 bg-yellow-100' : 'border-dashed border-stone-300 bg-white'}`}
    >
        {guest && <img src={guest.avatarUrl} className="w-full h-full rounded-full" />}
    </div>
);
