import { memo, useCallback, useEffect, useMemo } from 'react';
import { Menu } from '@mantine/core';
import { EllipsisVertical, ExternalLink, Trash2, UserMinus } from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import type { IGuest } from '../types/wedding';
import { modals } from '@mantine/modals';

function GuestActionsMenu({ guest }: { guest: IGuest }) {
    const { invitations, removeInvitationById, setIsPair, isPair } = useWeddingStore();
    const currentInvitation = useMemo(
        () => invitations.find((inv) => inv.id === guest.invitationId),
        [invitations, guest],
    );

    const handleCopyLinkClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (!currentInvitation) {
                return alert('Отсутствует приглашение для этого гостя');
            }

            const link = `${window.location.origin}/invite/${currentInvitation.token}`;

            navigator.clipboard.writeText(link);
        },
        [currentInvitation],
    );

    const handleGuestDeleteClick = useCallback(() => {}, []);

    const handleInvitationDeleteClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            modals.openConfirmModal({
                title: 'Вы действительно хотите удалить приглашение?',
                labels: { confirm: 'Да', cancel: 'Отмена' },
                onConfirm: async () => {
                    await removeInvitationById(guest.invitationId);
                },
            });
        },
        [guest, removeInvitationById],
    );

    useEffect(() => {
        setIsPair(currentInvitation);
    }, [setIsPair, currentInvitation]);

    return (
        <Menu shadow="md" width={220}>
            <Menu.Target>
                <EllipsisVertical
                    className="opacity-0 group-hover:opacity-100 cursor-pointer"
                    color="gray"
                    size={20}
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={handleCopyLinkClick} leftSection={<ExternalLink size={16} />}>
                    Копировать ссылку
                </Menu.Item>
                <Menu.Divider />
                {isPair && (
                    <Menu.Item
                        onClick={handleGuestDeleteClick}
                        color="orange"
                        leftSection={<UserMinus size={16} />}
                    >
                        Удалить гостя
                    </Menu.Item>
                )}
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
