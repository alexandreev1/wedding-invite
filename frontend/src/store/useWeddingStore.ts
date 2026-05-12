import { create } from 'zustand';
import type { IGuest, IInvitation } from '../types/wedding';
import { api } from '../shared/api';

interface WeddingState {
    invitations: IInvitation[];

    fetchInvitations: () => Promise<void>;

    getAllGuests: () => IGuest[];

    // Экшены для управления гостями
    addInvitation: (invitation: IInvitation) => Promise<void>;
    removeInvitation: (id: string) => Promise<void>;

    // Экшены для рассадки
    updateGuestSeat: (guestId: string | null, tableId: number | null, seatNumber: number | null) => Promise<void>;
    removeGuestFromTable: (guestId: string) => Promise<void>;

    // Экшен для RSVP (со стороны гостя)
    updateRSVP: (guestId: string, status: boolean) => void;

    resetStore: () => void;
    isLoading: boolean;
    isAdmin: boolean;
}

export const useWeddingStore = create<WeddingState>((set, get) => ({
    invitations: [],
    isLoading: false,
    isAdmin: false,

    // Загрузка данных из БД при старте приложения
    fetchInvitations: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/invitations');
            // Мы полностью перезаписываем стор данными из БД
            set({ invitations: res.data, isAdmin: true });
        } catch (error) {
            set({ isAdmin: false });
            console.error("Ошибка синхронизации:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addInvitation: async (newInvite) => {
        set({ isLoading: true });
        try {
            // 1. Отправляем на сервер
            await api.post('/invitations', newInvite);
            // 2. Обновляем локальный стейт
            await get().fetchInvitations();
        } catch (error) {
            alert("Не добавить приглашение. Данные будут откачены.");
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

    //TODO: Переписать остальные функции на апи, уточнить по поводу getAllGuests

    getAllGuests: () => {
        return get().invitations.flatMap(invite => invite.guests);
    },

    updateGuestSeat: async (guestId, tableId, seatNumber) => {
        set({ isLoading: true });
        try {
            // 1. Отправляем запрос
            await api.patch(`/guests/${guestId}`, { tableId, seatNumber });

            // 2. Вместо ручного поиска в массиве просто перекачиваем данные из БД
            // get() — это функция Zustand для доступа к методам внутри стора
            await get().fetchInvitations();

        } catch (error) {
            alert("Не удалось добавить гостя на стол. Данные будут откачены.");
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

    removeGuestFromTable: async (guestId) => {
        set({ isLoading: true });
        try {
            await api.patch(`/guests/${guestId}`, { tableId: null, seatNumber: null });
            await get().fetchInvitations();
        } catch (error) {
            alert("Не удалось удалить гостя со стола. Данные будут откачены.");
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

    removeInvitation: async (id: string) => {
        set({ isLoading: true });
        try {
            await api.delete(`/invitations/${id}`);
            await get().fetchInvitations();

        } catch (error) {
            alert("Не удалось удалить гостя со стола. Данные будут откачены.");
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

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
