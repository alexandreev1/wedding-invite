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

export enum GUEST_FORM_ITEMS {
    BUFFET = 'buffet',
    BANQUET = 'banquet',
    HOT_DISH = 'hotDish',
    TRANSFER = 'transfer',
}

export const GUEST_FORM_ITEMS_CAPTIONS = {
    [GUEST_FORM_ITEMS.BUFFET]: 'Напитки на фуршете',
    [GUEST_FORM_ITEMS.BANQUET]: 'Напитки на банкете',
    [GUEST_FORM_ITEMS.HOT_DISH]: 'Горячее блюдо',
    [GUEST_FORM_ITEMS.TRANSFER]: 'Понадобится ли трансфер',
};

export enum GUEST_FORM_BUFFET_ITEMS {
    SPARKLING_WINE = 'sparklingWine',
    BEER = 'beer',
    SOFT_DRINKS = 'softDrinks',
}

export const GUEST_FORM_BUFFET_ITEMS_CAPTIONS = {
    [GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE]: 'Игристое вино',
    [GUEST_FORM_BUFFET_ITEMS.BEER]: 'Пиво',
    [GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]: 'Безалкогольные напитки',
};

export const HOT_DISH_RADIO_GROUP_CONFIG = [
    {
        value: 'fish',
        label: 'Филе дорадо c овощным рататуем',
    },
    {
        value: 'duck',
        label: 'Грудка утки c птитимом в пряных травах c мандариновым соусом',
    },
    {
        value: 'beef',
        label: 'Щечки говяжьи в мясном соусе с картофельным гратеном',
    },
    {
        value: 'pork',
        label: 'Свинина запеченая с жареной стручковой фасолью и томатным соусом',
    },
];

export const TRANSFER_RADIO_GROUP_CONFIG = [
    {
        value: 'forward',
        label: 'Только туда',
    },
    {
        value: 'backAndForward',
        label: 'Туда и обратно',
    },
    {
        value: 'back',
        label: 'Только обратно',
    },
    {
        value: 'decline',
        label: 'Не нужен',
    },
];
