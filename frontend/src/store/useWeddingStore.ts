import { create } from 'zustand';
import type { IGuest, IInvitation } from '../types/wedding';
import { api } from '../shared/api';

interface WeddingState {
    invitations: IInvitation[];

    fetchInvitations: () => Promise<void>;

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

export const useWeddingStore = create<WeddingState>((set, get) => ({
    invitations: [],

    // Загрузка данных из БД при старте приложения
    fetchInvitations: async () => {
        const res = await api.get('/invitations');
        set({ invitations: res.data });
    },

    addInvitation: async (newInvite) => {
        // 1. Отправляем на сервер
        const res = await api.post('/invitations', newInvite);
        // 2. Обновляем локальный стейт
        set((state) => ({
            invitations: [...state.invitations, res.data]
        }));
    },

    //TODO: Переписать остальные функции на апи, уточнить по поводу getAllGuests

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
}));
