import { useDraggable } from '@dnd-kit/core';
import { memo } from 'react';
import type { IGuest } from '../types/wedding';
import GuestActionsMenu from './GuestActionsMenu';

export const DraggableGuest = memo(({ guest }: { guest: IGuest }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: guest.id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`group relative flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg shadow-sm transition-all 
        ${isDragging ? 'opacity-30' : 'opacity-100 hover:border-yellow-400'}`}
        >
            <div
                {...listeners}
                {...attributes}
                className="flex items-center gap-3 cursor-all-scroll flex-1"
            >
                <img src={guest.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                <span className="text-sm font-medium">{`${guest.name} ${guest.lastname}`}</span>
            </div>

            {/* Кнопка меню */}
            <GuestActionsMenu guest={guest} />
        </div>
    );
});
