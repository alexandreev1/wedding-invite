import * as short from 'short-uuid';
import {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_ITEMS,
    WINE_TYPES,
} from './constants';
import type { IGuest, IGuestFormResult, IInvitation, TGender } from '../types/wedding';

// Функция для формирования чистого URL аватарки
export function getAvatarUrl(name: string) {
    return `https://eu.ui-avatars.com/api/?seed=${encodeURIComponent(name)}&name=${name}&background=random&color=fff&rounded=true`;
}

export function getToken(uuid: string) {
    const translator = short.createTranslator();
    return translator.fromUUID(uuid);
}

export function getInitialGuestFormData(): IGuestFormResult {
    return {
        [GUEST_FORM_ITEMS.BUFFET]: {
            [GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE]: false,
            [GUEST_FORM_BUFFET_ITEMS.BEER]: false,
            [GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]: false,
        },
        [GUEST_FORM_ITEMS.BANQUET]: {
            [GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE]: false,
            [GUEST_FORM_BANQUET_ITEMS.RED_WINE]: false,
            [GUEST_FORM_BANQUET_ITEMS.RED_WINE_TYPE]: WINE_TYPES.SEMI_SWEET,
            [GUEST_FORM_BANQUET_ITEMS.WHITE_WINE]: false,
            [GUEST_FORM_BANQUET_ITEMS.WHITE_WINE_TYPE]: WINE_TYPES.SEMI_SWEET,
            [GUEST_FORM_BANQUET_ITEMS.WHISKEY]: false,
            [GUEST_FORM_BANQUET_ITEMS.COGNAC]: false,
            [GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS]: false,
            [GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO]: '',
        },
        [GUEST_FORM_ITEMS.HOT_DISH]: null,
        [GUEST_FORM_ITEMS.TRANSFER]: null,
    };
}

export function getFormInitialData(invitation?: IInvitation | null) {
    if (invitation) {
        const [guest1, guest2] = invitation.guests;

        return {
            firstGuestName: guest1.name,
            firstGuestLastname: guest1.lastname,
            firstGuestComment: guest1.comment,
            firstGuestPhoto: guest1.avatarUrl,
            firstGuestGender: guest1.gender,
            secondGuestName: guest2?.name || '',
            secondGuestLastname: guest2?.lastname || '',
            secondGuestComment: guest2?.comment || '',
            secondGuestPhoto: guest2?.avatarUrl || '',
            secondGuestGender: guest2?.gender || 'female',
        };
    }

    return {
        firstGuestName: '',
        firstGuestLastname: '',
        firstGuestComment: '',
        firstGuestPhoto: '',
        firstGuestGender: 'male' as TGender,
        secondGuestName: '',
        secondGuestLastname: '',
        secondGuestComment: '',
        secondGuestPhoto: '',
        secondGuestGender: 'female' as TGender,
    };
}

export function getInitialGuestInfo(data: {
    name: string;
    lastname: string;
    invitationId: string;
    gender: TGender;
    comment?: string;
}): IGuest {
    return {
        id: crypto.randomUUID(),
        invitationId: data.invitationId,
        name: data.name.trim(),
        lastname: data.lastname.trim(),
        comment: data.comment?.trim(),
        gender: data.gender,
        avatarUrl: getAvatarUrl(data.name),
        tableId: null,
        seatNumber: null,
        formResult: null,
    };
}
