import { memo } from 'react';
import type { IGuest } from '../types/wedding';

const GuestItem = memo(({ guest }: { guest: IGuest }) => {
    return (
        <div className="group w-full relative flex items-center justify-between p-3">
            <div className="flex items-center gap-3 flex-1">
                <img src={guest.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                <span className="text-sm font-medium">{`${guest.name} ${guest.lastname}`}</span>
            </div>
        </div>
    );
});

export default GuestItem;
