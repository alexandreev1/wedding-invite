export const TABLES = [
    // Ряд А
    { id: 1, name: 'Стол 1', maxSeats: 4 },
    { id: 2, name: 'Стол 2', maxSeats: 4 },
    { id: 3, name: 'Стол 3', maxSeats: 4 },
    { id: 4, name: 'Стол 4', maxSeats: 4 },
    { id: 5, name: 'Стол 5', maxSeats: 4 },
    // Ряд Б
    { id: 6, name: 'Стол 6', maxSeats: 5 }, // Торцевое место (Seat 5)
    { id: 7, name: 'Стол 7', maxSeats: 4 },
    { id: 8, name: 'Стол 8', maxSeats: 4 },
    { id: 9, name: 'Стол 9', maxSeats: 5 }, // Торцевое место (Seat 5)
];

export const LOCATIONS_INFO = {
    REGISTRY: {
        caption: 'Роспись состоится в ЗАГС по адресу:\nул. Кораблестроителей, 6',
        href: 'https://yandex.ru/maps/-/CPgWjEoS',
    },
    BANKET: {
        caption: 'Банкет пройдёт\nв парк-отеле "Бухта Коприно",\nверанда ресторана "Калита"',
        href: 'https://yandex.ru/maps/-/CPgWj-k7',
    },
};
