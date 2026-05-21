import { create } from 'zustand';
import type { IGuest, IGuestFormResult, IInvitation } from '../types/wedding';
import { api } from '../shared/api';
import { getInitialGuestFormData } from '../shared/utils';

interface WeddingState {
    invitations: IInvitation[];
    currentInvitation: IInvitation | null;
    guestData: IGuest | null;

    fetchInvitations: () => Promise<void>;

    getInvitation: (token: string | undefined) => Promise<void>;

    getAllGuests: () => IGuest[];

    fetchGuestData: (id: string | undefined) => Promise<void>;
    patchGuestData: (id: string | undefined, formResult: string | null) => Promise<void>;

    // Экшены для управления гостями
    addInvitation: (invitation: IInvitation) => Promise<void>;
    removeInvitation: (id: string) => Promise<void>;

    // Экшены для рассадки
    updateGuestSeat: (
        guestId: string | null,
        tableId: number | null,
        seatNumber: number | null,
    ) => Promise<void>;
    removeGuestFromTable: (guestId: string) => Promise<void>;

    // Экшен для RSVP (со стороны гостя)
    updateRSVP: (token: string | undefined, status: boolean) => Promise<void>;

    isLoading: boolean;
    isAdmin: boolean;
    isPair: boolean;
    firstGuest: IGuest | null;
    secondGuest: IGuest | null;

    guestFormData: IGuestFormResult | null;
}

export const useWeddingStore = create<WeddingState>((set, get) => ({
    invitations: [],
    currentInvitation: null,
    guestData: null,
    isLoading: false,
    isAdmin: false,
    isPair: false,
    firstGuest: null,
    secondGuest: null,
    guestFormData: null,

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
            set({
                isPair: !!currentInvitation && currentInvitation.guests.length > 1,
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
            const guestData = res.data as IGuest;
            set({ guestData });
            const guestFormData =
                (guestData.formResult && JSON.parse(guestData.formResult)) ||
                getInitialGuestFormData();
            set({ guestFormData });
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
        } finally {
            set({ isLoading: false });
        }
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
            alert('Не удалось добавить гостя на стол. Данные будут откачены.');
            await get().fetchInvitations(); // Откатываем UI к состоянию базы
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
            await get().fetchInvitations();
        } catch (error) {
            alert('Не удалось удалить гостя со стола. Данные будут откачены.');
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
}));
