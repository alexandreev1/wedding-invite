import type {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_HOT_DISH_ITEMS,
    GUEST_FORM_ITEMS,
    GUEST_FORM_TRANSFER_ITEMS,
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
    [GUEST_FORM_ITEMS.BANQUET]: Record<GUEST_FORM_BANQUET_ITEMS, boolean> & {
        [GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO]: string | undefined;
    };
    [GUEST_FORM_ITEMS.HOT_DISH]: GUEST_FORM_HOT_DISH_ITEMS | null;
    [GUEST_FORM_ITEMS.TRANSFER]: GUEST_FORM_TRANSFER_ITEMS | null;
}
