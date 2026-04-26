export function generateToken(name: string): string {
    // Простая транслитерация (опционально) или очистка от спецсимволов
    const slug = name
        .toLowerCase()
        .replace(/[^a-zа-я0-9]/gi, '-')
        .replace(/-+/g, '-');

    // Добавляем 4 случайных символа для уникальности
    const randomBits = Math.random().toString(36).substring(2, 6);

    return `${slug}-${randomBits}`;
}

// Функция для формирования чистого URL аватарки
export function getAvatarUrl(name: string) {
    return `https://eu.ui-avatars.com/api/?seed=${encodeURIComponent(name)}&name=${name}&background=random&color=fff&rounded=true`;
}

export function getNewGuest(name: string) {
    const nameTrim = name.trim();
    return {
        id: crypto.randomUUID(),
        name: nameTrim,
        token: generateToken(nameTrim), // Генерируем красивый хвостик для ссылки
        tableId: null,
        seatNumber: null,
        isRSVP: false,
        // Рандомная аватарка для красоты (потом можно будет загружать свои)
        avatarUrl: getAvatarUrl(nameTrim)
    }
}