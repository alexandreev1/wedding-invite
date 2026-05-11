import { useCallback, useEffect, useState } from 'react';
import { DndContext, type DragEndEvent, type DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { useShallow } from 'zustand/shallow';
import { useWeddingStore } from '../store/useWeddingStore';
import { DraggableGuest } from '../components/DraggableGuest';
import { DroppableTable } from '../components/DroppableTable';
import TableEditor from '../components/TableEditor';
import CreateInvitationForm from '../components/CreateInivitationForm';
import { TABLES } from '../shared/constants';
import type { IGuest, ITable } from '../types/wedding';

const AdminDashboard = () => {
    const { updateGuestSeat, removeGuestFromTable, resetStore, fetchInvitations } = useWeddingStore();

    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTableForSeating, setSelectedTableForSeating] = useState<number | null>(null);
    const [tableEditing, setTableEditing] = useState(false);

    const allGuests = useWeddingStore(
        useShallow((state) => state.invitations.flatMap(i => i.guests))
    );
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        const guestId = active.id as string;

        if (over) {
            const tableId = over.data.current?.tableId;
            setTableEditing(true);
            setSelectedTableForSeating(tableId);
        } else {
            updateGuestSeat(guestId, null, null);
        }
    };

    const handleTableClick = useCallback((tableId: ITable['id']) => {
        setTableEditing(true);
        setSelectedTableForSeating(tableId);
    }, []);

    const handleEmptySeatClick = useCallback((tableId: number, seat: number, guest?: IGuest) => {
        updateGuestSeat(guest?.id || null, tableId, seat);
        setSelectedTableForSeating(null);
        setTableEditing(false)
        setActiveId(null);
    }, []);

    const handleGuestClick = useCallback((guest: IGuest) => {
        if (window.confirm("Вернуть гостя в общий список?")) {
            removeGuestFromTable(guest.id);
        }
        setSelectedTableForSeating(null);
        setTableEditing(false)
        setActiveId(null);
    }, []);

    const handleTableCloseClick = useCallback(() => {
        setSelectedTableForSeating(null);
        setTableEditing(false);
        setActiveId(null);
    }, []);

    const handleFullReset = () => {
        if (window.confirm("ВНИМАНИЕ! Это удалит ВСЕХ гостей и всю рассадку. Вы уверены?")) {
            resetStore();
        }
    };

    const activeGuest = allGuests.find(g => g.id === activeId);



    useEffect(() => {
        fetchInvitations();
    }, [fetchInvitations]);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="h-screen w-full flex bg-stone-50 overflow-hidden">
                <aside className="w-80 bg-white border-r p-6 overflow-y-auto">
                    <div className="p-6 border-b border-stone-100">
                        <h2 className="text-xl font-serif mb-4 text-stone-800">Создать приглашение</h2>
                        <CreateInvitationForm />
                    </div>
                    <div className="space-y-3">
                        {allGuests.filter(g => g.tableId === null).map((guest: IGuest) => (
                            <DraggableGuest key={guest.id} guest={guest} />
                        ))}
                    </div>
                    <button
                        onClick={handleFullReset}
                        className="m-4 p-2 text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 border border-red-100 rounded hover:bg-red-50 transition-colors"
                    >
                        Полный сброс базы
                    </button>
                </aside>

                <main className="flex-1 p-10 flex gap-[148px] justify-center items-center">
                    {TABLES.map(table => (
                        <DroppableTable
                            key={table.id}
                            table={table}
                            seatedGuests={allGuests.filter(g => g.tableId === table.id)}
                            onClick={handleTableClick}
                        />
                    ))}
                </main>

                <DragOverlay>
                    {activeId && activeGuest ? (
                        <div className="flex items-center gap-3 p-3 bg-white border-2 border-yellow-500 rounded-lg shadow-2xl scale-105 opacity-90 w-64">
                            <img src={activeGuest.avatarUrl} className="w-8 h-8 rounded-full" alt="" />
                            <span className="text-sm font-medium">{activeGuest.name}</span>
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
            {tableEditing && (
                <TableEditor tableId={selectedTableForSeating} activeGuestId={activeGuest?.id} onGuestClickHandler={handleGuestClick} onEmptySeatClickHandler={handleEmptySeatClick} onCloseHandler={handleTableCloseClick} />
            )}
        </DndContext>
    );
};

export default AdminDashboard;
