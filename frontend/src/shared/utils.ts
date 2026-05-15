import * as short from 'short-uuid';

// Функция для формирования чистого URL аватарки
export function getAvatarUrl(name: string) {
    return `https://eu.ui-avatars.com/api/?seed=${encodeURIComponent(name)}&name=${name}&background=random&color=fff&rounded=true`;
}

export function getToken(uuid: string) {
    const translator = short.createTranslator();
    return translator.fromUUID(uuid);
}
