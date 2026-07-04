export const TABLES = [
    { id: 1, name: 'Стол 1', maxSeats: 16 },
    { id: 2, name: 'Стол 2', maxSeats: 20 },
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

export const HOT_DISH_CAPTIONS = {
    [GUEST_FORM_HOT_DISH_ITEMS.FISH]: 'Филе дорадо c овощным рататуем',
    [GUEST_FORM_HOT_DISH_ITEMS.DUCK]:
        'Грудка утки c птитимом в пряных травах c мандариновым соусом',
    [GUEST_FORM_HOT_DISH_ITEMS.BEEF]: 'Щечки говяжьи в мясном соусе с картофельным гратеном',
    [GUEST_FORM_HOT_DISH_ITEMS.PORK]:
        'Свинина запеченая с жареной стручковой фасолью и томатным соусом',
};

export const HOT_DISH_RADIO_GROUP_CONFIG = [
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.FISH,
        label: HOT_DISH_CAPTIONS[GUEST_FORM_HOT_DISH_ITEMS.FISH],
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.DUCK,
        label: HOT_DISH_CAPTIONS[GUEST_FORM_HOT_DISH_ITEMS.DUCK],
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.BEEF,
        label: HOT_DISH_CAPTIONS[GUEST_FORM_HOT_DISH_ITEMS.BEEF],
    },
    {
        value: GUEST_FORM_HOT_DISH_ITEMS.PORK,
        label: HOT_DISH_CAPTIONS[GUEST_FORM_HOT_DISH_ITEMS.PORK],
    },
];

export const TRANSFER_CAPTIONS = {
    [GUEST_FORM_TRANSFER_ITEMS.FORWARD]: 'Только туда',
    [GUEST_FORM_TRANSFER_ITEMS.BACK_AND_FORWARD]: 'Туда и обратно',
    [GUEST_FORM_TRANSFER_ITEMS.BACK]: 'Только обратно',
    [GUEST_FORM_TRANSFER_ITEMS.DECLINE]: 'Не нужен',
};

export const TRANSFER_RADIO_GROUP_CONFIG = [
    {
        value: GUEST_FORM_TRANSFER_ITEMS.FORWARD,
        label: TRANSFER_CAPTIONS[GUEST_FORM_TRANSFER_ITEMS.FORWARD],
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.BACK_AND_FORWARD,
        label: TRANSFER_CAPTIONS[GUEST_FORM_TRANSFER_ITEMS.BACK_AND_FORWARD],
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.BACK,
        label: TRANSFER_CAPTIONS[GUEST_FORM_TRANSFER_ITEMS.BACK],
    },
    {
        value: GUEST_FORM_TRANSFER_ITEMS.DECLINE,
        label: TRANSFER_CAPTIONS[GUEST_FORM_TRANSFER_ITEMS.DECLINE],
    },
];
