import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IGuest, IInvitation } from '../types/wedding';

interface WeddingState {
    invitations: IInvitation[];

    getAllGuests: () => IGuest[];

    // Экшены для управления гостями
    addInvitation: (invitation: IInvitation) => void;
    removeInvitation: (id: string) => void;

    // Экшены для рассадки
    updateGuestSeat: (guestId: string | null, tableId: number | null, seatNumber: number | null) => void;
    removeGuestFromTable: (guestId: string) => void;

    // Экшен для RSVP (со стороны гостя)
    updateRSVP: (guestId: string, status: boolean) => void;

    resetStore: () => void;
}

export const useWeddingStore = create<WeddingState>()(
    persist(
        (set, get) => ({
            guests: [], // Начинаем с пустого списка
            invitations: [],

            getAllGuests: () => {
                return get().invitations.flatMap(invite => invite.guests);
            },

            updateGuestSeat: (guestId, tableId, seatNumber) => set((state) => ({
                invitations: state.invitations.map(invite => ({
                    ...invite,
                    guests: invite.guests.map(guest =>
                        guest.id === guestId ? { ...guest, tableId, seatNumber } : guest
                    )
                }))
            })),

            removeGuestFromTable: (guestId) => set((state) => ({
                invitations: state.invitations.map(invite => ({
                    ...invite,
                    guests: invite.guests.map(guest =>
                        guest.id === guestId ? { ...guest, tableId: null, seatNumber: null } : guest
                    )
                }))
            })),

            addInvitation: (invitation) => set((state) => ({
                invitations: [...state.invitations, invitation]
            })),

            removeInvitation: (id) => set((state) => ({
                invitations: state.invitations.filter(inv => inv.id !== id)
            })),

            updateRSVP: (guestId, status) => set((state) => ({
                invitations: state.invitations.map(invite => ({
                    ...invite,
                    guests: invite.guests.map(guest =>
                        guest.id === guestId ? { ...guest, isRSVP: status } : guest
                    )
                }))
            })),

            resetStore: () => set({ invitations: [] }),
        }),
        {
            name: 'wedding-storage', // Ключ в localStorage
        }
    )
);
