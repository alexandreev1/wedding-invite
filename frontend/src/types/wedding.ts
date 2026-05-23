import type {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_HOT_DISH_ITEMS,
    GUEST_FORM_ITEMS,
    GUEST_FORM_TRANSFER_ITEMS,
    WINE_TYPES,
} from '../shared/constants';

export interface ITable {
    id: number;
    name: string;
    maxSeats: number;
}

export type TGender = 'male' | 'female';

export interface IGuest {
    id: string;
    name: string;
    gender: TGender;
    avatarUrl: string;
    tableId: number | null;
    seatNumber: number | null;
    invitationId: string;
    formResult: string | undefined;
}

export interface IInvitation {
    id: string;
    token: string;
    guests: IGuest[];
    isRSVP: boolean;
}

export interface ILocationProps {
    caption: string;
    href: string;
}

export interface IButtonProps {
    caption: string;
    viewMode?: 'regular' | 'link';
    disabled?: boolean;
    onButtonClick: () => void;
}

export interface ICheckboxProps {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
}

export interface ITextInputProps {
    label: string;
    placeholder: string;
    value: string | undefined;
    onValueChange: (newValue: string) => void;
}

interface IRadioGroupConfig {
    value: string;
    label: string;
}

type TRadioGroupConfig = IRadioGroupConfig[];

export interface IRadioGroupProps {
    groupLabel: string;
    value: string | null;
    onValueChange: (newValue: string) => void;
    radioGroupConfig: TRadioGroupConfig;
}

export interface IGuestFormResult {
    [GUEST_FORM_ITEMS.BUFFET]: Record<GUEST_FORM_BUFFET_ITEMS, boolean>;
    [GUEST_FORM_ITEMS.BANQUET]: {
        [GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.RED_WINE]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.RED_WINE_TYPE]: WINE_TYPES;
        [GUEST_FORM_BANQUET_ITEMS.WHITE_WINE]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.WHITE_WINE_TYPE]: WINE_TYPES;
        [GUEST_FORM_BANQUET_ITEMS.WHISKEY]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.COGNAC]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS]: boolean;
        [GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO]: string | undefined;
    };
    [GUEST_FORM_ITEMS.HOT_DISH]: GUEST_FORM_HOT_DISH_ITEMS | null;
    [GUEST_FORM_ITEMS.TRANSFER]: GUEST_FORM_TRANSFER_ITEMS | null;
}

export interface IWineTypePicker {
    value: WINE_TYPES;
    onValueChange: (type: WINE_TYPES) => void;
}
