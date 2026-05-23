import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DndContext, type DragEndEvent, type DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { useShallow } from 'zustand/shallow';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useWeddingStore } from '../store/useWeddingStore';
import { DraggableGuest } from '../components/DraggableGuest';
import { DroppableTable } from '../components/DroppableTable';
import TableEditor from '../components/TableEditor';
import CreateInvitationForm from '../components/CreateInivitationForm';
import { TABLES } from '../shared/constants';
import type { IGuest, ITable } from '../types/wedding';

const SittingPlan = () => {
    const { updateGuestSeat, removeGuestFromTable, invitations } = useWeddingStore();

    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTableForSeating, setSelectedTableForSeating] = useState<number | null>(null);
    const [tableEditing, { open: openTable, close: closeTable }] = useDisclosure(false);

    const allGuests = useWeddingStore(
        useShallow((state) => state.invitations.flatMap((i) => i.guests)),
    );
    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }, []);

    const handleDragEnd = useCallback(
        async (event: DragEndEvent) => {
            const { over, active } = event;
            const guestId = active.id as string;

            if (over) {
                const tableId = over.data.current?.tableId;
                openTable();
                setSelectedTableForSeating(tableId);
            } else {
                await updateGuestSeat(guestId, null, null);
            }
        },
        [openTable, updateGuestSeat],
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

    if (!invitations) {
        return null;
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="h-screen w-full flex bg-stone-50 overflow-hidden">
                <aside className="w-80 bg-white border-r p-6 overflow-y-auto">
                    <div className="p-6 border-b border-stone-100">
                        <h2 className="text-xl font-serif mb-4 text-stone-800">
                            Создать приглашение
                        </h2>
                        <CreateInvitationForm />
                    </div>
                    <div className="space-y-3">
                        {allGuests
                            .filter((g) => g.tableId === null)
                            .map((guest: IGuest) => (
                                <DraggableGuest key={guest.id} guest={guest} />
                            ))}
                    </div>
                </aside>
                <main className="flex-1 p-10 flex flex-col items-center overflow-y-auto">
                    {/* Статичный Президиум (для красоты) */}
                    <div className="mb-20 p-6 bg-white border-b-4 border-yellow-500 shadow-sm text-center">
                        <h2 className="font-serif text-2xl">ПРЕЗИДИУМ</h2>
                        <div className="flex gap-10 mt-4">
                            <div className="w-16 h-16 rounded-full border-2 border-yellow-200 flex items-center justify-center text-xs">
                                Я
                            </div>
                            <div className="w-16 h-16 rounded-full border-2 border-yellow-200 flex items-center justify-center text-xs">
                                Невеста
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-32 h-fit">
                        {/* Ряд А (Левый) */}
                        <div className="flex flex-col gap-0 border-l-2 border-stone-100">
                            {TABLES.filter((t) => t.id <= 5).map((table) => (
                                <DroppableTable
                                    key={table.id}
                                    table={table}
                                    seatedGuests={allGuests.filter((g) => g.tableId === table.id)}
                                    onClick={handleTableClick}
                                />
                            ))}
                        </div>
                        {/* Ряд Б (Правый) */}
                        <div className="flex flex-col gap-0 border-r-2 border-stone-100">
                            {TABLES.filter((t) => t.id >= 6).map((table) => (
                                <DroppableTable
                                    key={table.id}
                                    table={table}
                                    seatedGuests={allGuests.filter((g) => g.tableId === table.id)}
                                    onClick={handleTableClick}
                                />
                            ))}
                        </div>
                    </div>
                </main>
                <DragOverlay>
                    {activeId && activeGuest ? (
                        <div className="flex items-center gap-3 p-3 bg-white border-2 border-yellow-500 rounded-lg shadow-2xl scale-105 opacity-90 w-64">
                            <img
                                src={activeGuest.avatarUrl}
                                className="w-8 h-8 rounded-full"
                                alt=""
                            />
                            <span className="text-sm font-medium">{activeGuest.name}</span>
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
            <Modal opened={tableEditing} onClose={closeTable}>
                <TableEditor
                    tableId={selectedTableForSeating}
                    activeGuestId={activeGuest?.id}
                    onGuestClickHandler={handleGuestClick}
                    onEmptySeatClickHandler={handleEmptySeatClick}
                />
            </Modal>
        </DndContext>
    );
};

export default memo(SittingPlan);
