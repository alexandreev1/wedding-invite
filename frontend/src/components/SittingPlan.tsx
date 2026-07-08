import { memo, useCallback, useEffect, useState } from 'react';
import { Modal, AppShell, Burger, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useWeddingStore } from '../store/useWeddingStore';
import InvitationForm from './InvitationForm';
import BasePlan from './BasePlan';
import type { IInvitation } from '../types/wedding';
import InvitationListItem from './InvitationListItem';

const SittingPlan = () => {
    const { invitations, seatedGuests, fetchSeatedGuests } = useWeddingStore();
    const [sideBarOpened, { toggle: toggleSidebar }] = useDisclosure();

    const [editingInvitation, setEditingInvitation] = useState<IInvitation | null>(null);
    const [invitationCreating, { open: openInvitationCreating, close: closeInvitationCreating }] =
        useDisclosure(false);
    const [invitationEditing, { open: openInvitationEditing, close: closeInvitationEditing }] =
        useDisclosure(false);

    const handleInvitationEditClick = useCallback((editingInvitation: IInvitation) => {
        setEditingInvitation(editingInvitation);
        openInvitationEditing();
    }, []);

    useEffect(() => {
        fetchSeatedGuests();
    }, [fetchSeatedGuests]);

    if (!invitations || !seatedGuests) {
        return null;
    }

    return (
        <AppShell
            className="h-full w-full relative"
            navbar={{ width: 350, breakpoint: 'sm', collapsed: { mobile: !sideBarOpened } }}
            header={{ height: 40, offset: true }}
            padding="md"
        >
            <AppShell.Navbar zIndex={40} p="sm" bg="gray.1">
                <Group justify="right" mb="md">
                    <Button variant="filled" size="md" onClick={openInvitationCreating}>
                        Создать приглашение
                    </Button>
                    <Modal
                        title="Создать приглашение"
                        opened={invitationCreating}
                        onClose={closeInvitationCreating}
                        centered
                    >
                        <InvitationForm closeFormCallback={closeInvitationCreating} />
                    </Modal>
                </Group>
                <div className="space-y-3 overflow-y-auto">
                    {invitations.map((invitation) => (
                        <InvitationListItem
                            key={invitation.id}
                            invitation={invitation}
                            editHandler={handleInvitationEditClick}
                        />
                    ))}
                    <Modal
                        title="Редактировать приглашение"
                        opened={invitationEditing}
                        onClose={closeInvitationEditing}
                        centered
                    >
                        <InvitationForm
                            invitation={editingInvitation}
                            closeFormCallback={closeInvitationEditing}
                        />
                    </Modal>
                </div>
            </AppShell.Navbar>
            <AppShell.Main
                className="h-full overflow-y-scroll flex flex-col items-center justify-center"
                bg="gray.1"
                p={12}
                mih={0}
            >
                <BasePlan editing />
            </AppShell.Main>
            <Burger
                className="absolute top-2 left-2 z-50"
                opened={sideBarOpened}
                onClick={toggleSidebar}
                hiddenFrom="sm"
                size="sm"
            />
        </AppShell>
    );
};

export default memo(SittingPlan);
