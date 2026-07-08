import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { Modal, Text, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import GuestItem from './GuestItem';
import type { ITable, IGuest } from '../types/wedding';
import { useWeddingStore } from '../store/useWeddingStore';
import '../styles/Table.less';
import { useParams } from 'react-router-dom';

export const Table = ({
    table,
    seatedGuests,
    editing,
}: {
    table: ITable;
    seatedGuests: IGuest[];
    editing: boolean;
}) => {
    const { id } = useParams();
    const { fetchUnseatedGuests, unseatedGuests, updateGuestSeat, removeGuestFromTable } =
        useWeddingStore();
    const [activeSeat, setActiveSeat] = useState<number | null>(null);
    const [activeGuestForModal, setActiveGuestForModal] = useState<IGuest | null>(null);
    const [guestPlacing, { open: openGuestPlacement, close: closeGuestPlacement }] =
        useDisclosure(false);
    const [photoOpened, { open: openGuestPhoto, close: closeGuestPhoto }] = useDisclosure(false);

    const currInvitationGuests = useMemo(
        () => seatedGuests.filter((guest) => guest.invitationId === id),
        [seatedGuests, id],
    );

    const handleEmptySeatClick = useCallback(
        async (seatNumber: number) => {
            if (!editing) {
                return;
            }

            setActiveSeat(seatNumber);
            await fetchUnseatedGuests();
            openGuestPlacement();
        },
        [fetchUnseatedGuests, openGuestPlacement, editing],
    );

    const handleUnseatedGuestClick = useCallback(
        async (guest: IGuest) => {
            if (!editing) {
                return;
            }

            await updateGuestSeat(guest.id, table.id, activeSeat);
            setActiveSeat(null);
            closeGuestPlacement();
        },
        [table, activeSeat, closeGuestPlacement, updateGuestSeat, editing],
    );

    const handleOpenGuestPhoto = useCallback(
        (activeGuest: IGuest) => {
            if (!activeGuest.avatarUrl) {
                return;
            }

            setActiveGuestForModal(activeGuest);
            openGuestPhoto();
        },
        [openGuestPhoto],
    );

    const handleSeatedSpotClick = useCallback(
        (guest: IGuest) => {
            editing
                ? modals.openConfirmModal({
                      title: 'Убрать гостя с места?',
                      labels: { confirm: 'Да', cancel: 'Нет' },
                      onConfirm: async () => {
                          await removeGuestFromTable(guest.id);
                      },
                  })
                : handleOpenGuestPhoto(guest);
        },
        [removeGuestFromTable, editing, handleOpenGuestPhoto],
    );

    return (
        <div className="Table relative">
            <div className="Table__seats flex flex-wrap w-full">
                {Array(table.maxSeats)
                    .fill(null)
                    .map((_el, index) => {
                        return (
                            <Seat
                                key={index}
                                seatNumber={index}
                                editing={editing}
                                guest={seatedGuests.find((g) => g.seatNumber === index)}
                                currInvitationGuests={currInvitationGuests}
                                onEmptySeatClick={handleEmptySeatClick}
                                onSeatedSpotClick={handleSeatedSpotClick}
                            />
                        );
                    })}
            </div>
            <div className="Table__base rounded-md border border-slate-300 bg-white flex items-center justify-center py-4 absolute">
                <span className="text-base tracking-wider text-slate-300">{table.id}</span>
            </div>
            <Modal opened={guestPlacing} onClose={closeGuestPlacement}>
                {unseatedGuests && unseatedGuests.length ? (
                    <div className="flex flex-col gap-2">
                        {unseatedGuests.map((guest) => (
                            <div
                                className="rounded-md border border-slate-100 cursor-pointer hover:border-slate-300 transition-colors"
                                onClick={() => handleUnseatedGuestClick(guest)}
                            >
                                <GuestItem guest={guest} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text>Больше нет гостей, добавьте новых</Text>
                )}
            </Modal>
            <Modal
                opened={photoOpened}
                onClose={closeGuestPhoto}
                closeOnClickOutside
                centered
                withOverlay
                withCloseButton={false}
                padding={0}
                size="md"
            >
                <div className="Table__photoModal">
                    <Image
                        src={activeGuestForModal?.avatarUrl}
                        radius="md"
                        w="auto"
                        fit="cover"
                        onClick={closeGuestPhoto}
                    />
                    <div className="Table__photoModal-captionWrapper">
                        <div className="Table__photoModal-caption">
                            <Text>{`${activeGuestForModal?.lastname} ${activeGuestForModal?.name}`}</Text>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

const Seat = ({
    guest,
    seatNumber,
    editing,
    currInvitationGuests,
    onEmptySeatClick,
    onSeatedSpotClick,
}: {
    guest?: IGuest;
    seatNumber: number;
    editing: boolean;
    currInvitationGuests: IGuest[];
    onEmptySeatClick: (seatNumber: number) => void;
    onSeatedSpotClick: (guest: IGuest) => void;
}) => {
    const isCurrInvitationGuest = currInvitationGuests.find((g) => g.id === guest?.id);

    return guest ? (
        <div className="flex items-center justify-end">
            <button
                className={clsx(
                    'Table__seats-seat',
                    'rounded-full',
                    'border',
                    'border-slate-200',
                    'bg-white',
                    'hover:border-slate-900',
                    'transition-colors',
                    'overflow-hidden',
                    'focus:outline-none',
                    'p-0.5',
                    isCurrInvitationGuest &&
                        'border-2 border-yellow-400 hover:border-yellow-200 Table__seats-seat_active',
                )}
                onClick={() => onSeatedSpotClick(guest)}
            >
                <img
                    src={guest.avatarUrl}
                    alt={guest.name}
                    className="w-full h-full object-cover rounded-full transition-all"
                />
            </button>
        </div>
    ) : (
        <div
            className={clsx(
                'Table__seats-seat',
                'rounded-full',
                'border',
                'border-dashed',
                'border-slate-200',
                'bg-white',
                editing && 'hover:border-slate-600',
                editing && 'cursor-pointer',
            )}
            onClick={() => onEmptySeatClick(seatNumber)}
        />
    );
};
