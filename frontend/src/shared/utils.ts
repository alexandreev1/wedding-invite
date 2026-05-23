import * as short from 'short-uuid';
import {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_ITEMS,
    WINE_TYPES,
} from './constants';
import type { IGuestFormResult } from '../types/wedding';

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
