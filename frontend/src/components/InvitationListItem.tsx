import { memo } from 'react';
import { Paper } from '@mantine/core';
import type { IInvitation } from '../types/wedding';
import GuestItem from './GuestItem';
import '../styles/InvitationListItem.less';
import GuestActionsMenu from './GuestActionsMenu';

function InvitationListItem({ invitation }: { invitation: IInvitation }) {
    if (!invitation || !invitation.guests) {
        return null;
    }

    return (
        <Paper className="InvitationListItem" shadow="md" radius="md">
            <>
                {invitation.guests.map((guest) => (
                    <GuestItem key={guest.id} guest={guest} />
                ))}

                {/* Кнопка меню */}
                <GuestActionsMenu className="InvitationListItem__actions" invitation={invitation} />
            </>
        </Paper>
    );
}

export default memo(InvitationListItem);
