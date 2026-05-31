import { memo, useCallback } from 'react';
import { Menu } from '@mantine/core';
import { EllipsisVertical, ExternalLink, Trash2, UserRoundPen } from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import type { IInvitation } from '../types/wedding';
import { modals } from '@mantine/modals';
import clsx from 'clsx';

function GuestActionsMenu({
    className,
    invitation,
}: {
    className: string;
    invitation: IInvitation;
}) {
    const { removeInvitationById } = useWeddingStore();

    const handleCopyLinkClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (!invitation) {
                return alert('Отсутствует приглашение');
            }

            const link = `${window.location.origin}/invite/${invitation.token}`;

            navigator.clipboard.writeText(link);
        },
        [invitation],
    );

    const handleInvitationEditClick = useCallback(() => {}, []);

    const handleInvitationDeleteClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            modals.openConfirmModal({
                title: 'Вы действительно хотите удалить приглашение?',
                labels: { confirm: 'Да', cancel: 'Отмена' },
                onConfirm: async () => {
                    await removeInvitationById(invitation.id);
                },
            });
        },
        [invitation, removeInvitationById],
    );

    return (
        <Menu shadow="md" width={220}>
            <Menu.Target>
                <EllipsisVertical
                    className={clsx(className, 'cursor-pointer')}
                    color="gray"
                    size={24}
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={handleCopyLinkClick} leftSection={<ExternalLink size={16} />}>
                    Копировать ссылку
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    onClick={handleInvitationEditClick}
                    color="yellow"
                    leftSection={<UserRoundPen size={16} />}
                >
                    Редактировать приглашение
                </Menu.Item>
                <Menu.Item
                    onClick={handleInvitationDeleteClick}
                    color="red"
                    leftSection={<Trash2 size={16} />}
                >
                    Удалить приглашение
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default memo(GuestActionsMenu);
