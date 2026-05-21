import type { GUEST_FORM_BUFFET_ITEMS, GUEST_FORM_ITEMS } from '../shared/constants';

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
}
