import { create } from 'zustand';
import type { IGuest, IInvitation } from '../types/wedding';
import { api } from '../shared/api';

interface WeddingState {
    invitations: IInvitation[];
    currentInvitation: IInvitation | undefined;
    guestData: IGuest | null;

    fetchInvitations: () => Promise<void>;

    getInvitation: (token: string | undefined) => Promise<void>;

    getAllGuests: () => IGuest[];

    fetchGuestData: (id: string | undefined) => Promise<void>;
    patchGuestData: (id: string | undefined, formResult: string | null) => Promise<void>;

    // Экшены для управления гостями
    addInvitation: (invitation: IInvitation) => Promise<void>;
    removeInvitationById: (id: string) => Promise<void>;

    // Экшены для рассадки
    updateGuestSeat: (
        guestId: string | null,
        tableId: number | null,
        seatNumber: number | null,
    ) => Promise<void>;
    removeGuestFromTable: (guestId: string) => Promise<void>;

    // Экшен для RSVP (со стороны гостя)
    updateRSVP: (token: string | undefined, status: boolean) => Promise<void>;
    updateGuests: (token: string, guests: IGuest[]) => Promise<void>;

    setIsPair: (currInvitation: IInvitation | undefined) => void;

    fetchUnseatedGuests: () => Promise<void>;
    fetchSeatedGuests: () => Promise<void>;
    unseatedGuests: IGuest[] | null;
    seatedGuests: IGuest[] | null;

    isLoading: boolean;
    isAdmin: boolean;
    isPair: boolean;
    firstGuest: IGuest | null;
    secondGuest: IGuest | null;
}

export const useWeddingStore = create<WeddingState>((set, get) => ({
    invitations: [],
    currentInvitation: undefined,
    guestData: null,
    isLoading: false,
    isAdmin: false,
    isPair: false,
    seatedGuests: null,
    unseatedGuests: null,
    setIsPair: (currInvitation) => {
        if (!currInvitation) {
            return;
        }
        set({ isPair: currInvitation.guests.length > 1 });
    },
    firstGuest: null,
    secondGuest: null,

    fetchSeatedGuests: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/seatedGuests');
            set({ seatedGuests: res.data });
        } catch (error) {
            console.error('Ошибка получения гостей:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUnseatedGuests: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/unseatedGuests');
            set({ unseatedGuests: res.data });
        } catch (error) {
            console.error('Ошибка получения гостей:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    // Загрузка данных из БД при старте приложения
    fetchInvitations: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/invitations');
            // Мы полностью перезаписываем стор данными из БД
            set({ invitations: res.data, isAdmin: true });
        } catch (error) {
            set({ isAdmin: false });
            console.error('Ошибка синхронизации:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getInvitation: async (token: string | undefined) => {
        if (!token) {
            return;
        }

        set({ isLoading: true });
        try {
            const res = await api.get(`/invitation-by-token/${token}`);
            set({ currentInvitation: res.data });

            const currentInvitation = get().currentInvitation;
            get().setIsPair(currentInvitation);
            set({
                firstGuest: currentInvitation?.guests[0],
                secondGuest: currentInvitation?.guests[1],
            });
        } catch (error) {
            console.error('Ошибка получения приглашения:', error);
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
            alert('Ошибка получения данных гостя.');
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

    //TODO: Переписать остальные функции на апи, уточнить по поводу getAllGuests

    getAllGuests: () => {
        return get().invitations.flatMap((invite) => invite.guests);
    },

    fetchGuestData: async (id: string | undefined) => {
        if (!id) {
            return;
        }

        set({ isLoading: true });
        try {
            const res = await api.get(`guest-by-id/${id}`);
            set({ guestData: res.data });
        } catch (error) {
            console.error('Не добавить приглашение. Данные будут откачены.', error);
        } finally {
            set({ isLoading: false });
        }
    },

    patchGuestData: async (id, formResult) => {
        if (!id) {
            return;
        }

        set({ isLoading: true });
        try {
            await api.patch(`/guests/${id}`, { formResult });
            await get().fetchGuestData(id);
        } catch (error) {
            console.error('Данные формы не обновились: ', error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateGuestSeat: async (guestId, tableId, seatNumber) => {
        set({ isLoading: true });
        try {
            await api.patch(`/guests/${guestId}`, { tableId, seatNumber });
            await get().fetchSeatedGuests();
        } catch (error) {
            alert('Не удалось добавить гостя на стол. Данные будут откачены.');
        } finally {
            set({ isLoading: false });
        }
    },

    removeGuestFromTable: async (guestId) => {
        set({ isLoading: true });
        try {
            await api.patch(`/guests/${guestId}`, {
                tableId: null,
                seatNumber: null,
            });
            await get().fetchSeatedGuests();
        } catch (error) {
            alert('Не удалось удалить гостя со стола. Данные будут откачены.');
        } finally {
            set({ isLoading: false });
        }
    },

    removeInvitationById: async (id: string) => {
        set({ isLoading: true });
        try {
            await api.delete(`/invitations/${id}`);
            await get().fetchInvitations();
        } catch (error) {
            alert('Не удалось удалить гостя со стола. Данные будут откачены.');
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
        } finally {
            set({ isLoading: false });
        }
    },

    updateRSVP: async (token, status) => {
        set({ isLoading: true });
        try {
            await api.patch(`/update-invitation/${token}`, { isRSVP: status });
            await get().getInvitation(token);
        } catch (error) {
            console.error('Не удалось обновить приглашение: ', error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateGuests: async (token, guests) => {
        set({ isLoading: true });
        try {
            await api.patch(`/update-invitation/${token}`, { guests: guests });
            await get().fetchInvitations();
        } catch (error) {
            console.error('Не удалось обновить приглашение: ', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
