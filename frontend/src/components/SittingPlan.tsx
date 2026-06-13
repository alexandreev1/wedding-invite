import { memo, useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { Modal, AppShell, Burger, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useWeddingStore } from '../store/useWeddingStore';
import { Table } from './Table';
import TableEditor from '../components/TableEditor';
import InvitationForm from './InvitationForm';
import { TABLES } from '../shared/constants';
import type { IGuest, IInvitation, ITable } from '../types/wedding';
import InvitationListItem from './InvitationListItem';

const SittingPlan = () => {
    const { updateGuestSeat, removeGuestFromTable, invitations } = useWeddingStore();
    const [sideBarOpened, { toggle: toggleSidebar }] = useDisclosure();

    const [activeId, setActiveId] = useState<string | null>(null);
    const [editingInvitation, setEditingInvitation] = useState<IInvitation | null>(null);
    const [selectedTableForSeating, setSelectedTableForSeating] = useState<number | null>(null);
    const [tableEditing, { open: openTable, close: closeTable }] = useDisclosure(false);
    const [invitationCreating, { open: openInvitationCreating, close: closeInvitationCreating }] =
        useDisclosure(false);
    const [invitationEditing, { open: openInvitationEditing, close: closeInvitationEditing }] =
        useDisclosure(false);

    const allGuests = useWeddingStore(
        useShallow((state) => state.invitations.flatMap((i) => i.guests)),
    );

    const handleTableClick = useCallback(
        (tableId: ITable['id']) => {
            openTable();
            setSelectedTableForSeating(tableId);
        },
        [openTable],
    );

    const handleEmptySeatClick = useCallback(
        async (tableId: number, seat: number, guest?: IGuest) => {
            await updateGuestSeat(guest?.id || null, tableId, seat);
            setSelectedTableForSeating(null);
            closeTable();
            setActiveId(null);
        },
        [updateGuestSeat, closeTable],
    );

    const handleGuestClick = useCallback(
        async (guest: IGuest) => {
            modals.openConfirmModal({
                title: 'Вернуть гостя в общий список?',
                labels: { confirm: 'Да', cancel: 'Отмена' },
                onConfirm: async () => {
                    await removeGuestFromTable(guest.id);
                    setSelectedTableForSeating(null);
                    closeTable();
                    setActiveId(null);
                },
            });
        },
        [removeGuestFromTable, closeTable],
    );

    const activeGuest = useMemo(
        () => allGuests.find((g) => g.id === activeId),
        [allGuests, activeId],
    );

    const handleInvitationEditClick = useCallback((editingInvitation: IInvitation) => {
        setEditingInvitation(editingInvitation);
        openInvitationEditing();
    }, []);

    if (!invitations) {
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
                className="h-full overflow-y-scroll flex flex-col items-center"
                bg="gray.1"
                p={12}
                mih={0}
            >
                {/* Статичный Президиум (для красоты) */}
                <div className="mb-10 p-6 border-b-4 border-red-800 text-center">
                    <h2 className="font-serif text-xl">ПРЕЗИДИУМ</h2>
                    <div className="flex gap-10 pt-3">
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-200 flex items-center justify-center text-xs">
                            Муж
                        </div>
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-200 flex items-center justify-center text-xs">
                            Жена
                        </div>
                    </div>
                </div>
                <div className="flex h-full gap-6">
                    {/* Ряд А (Левый) */}
                    <div className="flex flex-col gap-1">
                        {TABLES.filter((t) => t.id <= 5).map((table) => (
                            <Table
                                key={table.id}
                                table={table}
                                seatedGuests={allGuests.filter((g) => g.tableId === table.id)}
                                onClick={handleTableClick}
                            />
                        ))}
                    </div>
                    {/* Ряд Б (Правый) */}
                    <div className="flex flex-col gap-1">
                        {TABLES.filter((t) => t.id >= 6).map((table) => (
                            <Table
                                key={table.id}
                                table={table}
                                seatedGuests={allGuests.filter((g) => g.tableId === table.id)}
                                onClick={handleTableClick}
                            />
                        ))}
                    </div>
                </div>
            </AppShell.Main>
            <Modal title="Стол" opened={tableEditing} onClose={closeTable} centered>
                <TableEditor
                    tableId={selectedTableForSeating}
                    activeGuestId={activeGuest?.id}
                    onGuestClickHandler={handleGuestClick}
                    onEmptySeatClickHandler={handleEmptySeatClick}
                />
            </Modal>
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
