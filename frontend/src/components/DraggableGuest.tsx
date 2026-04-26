import { useDraggable } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { IGuest } from '../types/wedding';
import { useWeddingStore } from '../store/useWeddingStore';

export const DraggableGuest = ({ guest }: { guest: IGuest }) => {
    const { invitations } = useWeddingStore();

    const [copied, setCopied] = useState(false);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: guest.id,
    });

    const copyInviteLink = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Чтобы не сработал драг

        const invitation = invitations.find((inv) => inv.id === guest.invitationId);
        if (!invitation) {
            return alert('Отсутствует приглашение для этого гостя');
        }

        const link = `${window.location.origin}/invite/${invitation.token}`;

        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [invitations, guest]);

    return (
        <div
            ref={setNodeRef}
            className={`group relative flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg shadow-sm transition-all 
        ${isDragging ? 'opacity-30' : 'opacity-100 hover:border-yellow-400'}`}
        >
            <div {...listeners} {...attributes} className="flex items-center gap-3 cursor-grab flex-1">
                <img src={guest.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                <span className="text-sm font-medium">{guest.name}</span>
            </div>

            {/* Кнопка копирования ссылки */}
            <button
                onClick={copyInviteLink}
                className="p-2 text-stone-400 hover:text-yellow-600 transition-colors bg-stone-50 rounded-md opacity-0 group-hover:opacity-100"
                title="Копировать ссылку-приглашение"
            >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
        </div>
    );
};
