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

export enum GUEST_FORM_BANQUET_ITEMS {
    SPARKLING_WINE = 'sparklingWine',
    RED_WINE = 'redWine',
    RED_WINE_TYPE = 'redWineType',
    WHITE_WINE = 'whiteWine',
    WHITE_WINE_TYPE = 'whiteWineType',
    WHISKEY = 'whiskey',
    COGNAC = 'cognac',
    SOFT_DRINKS = 'softDrinks',
    ADDITIONAL_INFO = 'additionalInfo',
}

export enum GUEST_FORM_HOT_DISH_ITEMS {
    FISH = 'fish',
    DUCK = 'duck',
    BEEF = 'beef',
    PORK = 'pork',
}

export enum GUEST_FORM_TRANSFER_ITEMS {
    FORWARD = 'forward',
    BACK_AND_FORWARD = 'backAndForward',
    BACK = 'back',
    DECLINE = 'decline',
}

export const GUEST_FORM_BUFFET_ITEMS_CAPTIONS = {
    [GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE]: 'Игристое вино',
    [GUEST_FORM_BUFFET_ITEMS.BEER]: 'Пиво',
    [GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]: 'Безалкогольные напитки',
};

export const GUEST_FORM_BANQUET_ITEMS_CAPTIONS = {
    [GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE]: 'Игристое вино',
    [GUEST_FORM_BANQUET_ITEMS.RED_WINE]: 'Красное вино',
    [GUEST_FORM_BANQUET_ITEMS.WHITE_WINE]: 'Белое вино',
    [GUEST_FORM_BANQUET_ITEMS.WHISKEY]: 'Виски',
    [GUEST_FORM_BANQUET_ITEMS.COGNAC]: 'Коньяк',
    [GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS]: 'Безалкогольные напитки',
};

export enum WINE_TYPES {
    SEMI_SWEET = 'semiSweet',
    SEMI_DRY = 'semiDry',
    DRY = 'dry',
}

export const GUEST_FORM_WINE_SORTS_CAPTIONS = {
    [WINE_TYPES.SEMI_SWEET]: 'п/сл',
    [WINE_TYPES.SEMI_DRY]: 'п/сух',
    [WINE_TYPES.DRY]: 'сух',
};

export const WINE_TYPE_DATA = [
    { label: GUEST_FORM_WINE_SORTS_CAPTIONS[WINE_TYPES.SEMI_SWEET], value: WINE_TYPES.SEMI_SWEET },
    { label: GUEST_FORM_WINE_SORTS_CAPTIONS[WINE_TYPES.SEMI_DRY], value: WINE_TYPES.SEMI_DRY },
    { label: GUEST_FORM_WINE_SORTS_CAPTIONS[WINE_TYPES.DRY], value: WINE_TYPES.DRY },
];

export const HOT_DISH_RADIO_GROUP_CONFIG = [
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.FISH,
        label: 'Филе дорадо c овощным рататуем',
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.DUCK,
        label: 'Грудка утки c птитимом в пряных травах c мандариновым соусом',
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.BEEF,
        label: 'Щечки говяжьи в мясном соусе с картофельным гратеном',
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.PORK,
        label: 'Свинина запеченая с жареной стручковой фасолью и томатным соусом',
    },
];

export const TRANSFER_RADIO_GROUP_CONFIG = [
    {
        value: GUEST_FORM_TRANSFER_ITEMS.FORWARD,
        label: 'Только туда',
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.BACK_AND_FORWARD,
        label: 'Туда и обратно',
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.BACK,
        label: 'Только обратно',
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.DECLINE,
        label: 'Не нужен',
    },
];
