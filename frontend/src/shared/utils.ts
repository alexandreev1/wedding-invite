import * as short from 'short-uuid';
import { GUEST_FORM_BUFFET_ITEMS, GUEST_FORM_ITEMS } from './constants';
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
    };
}
