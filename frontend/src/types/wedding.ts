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
    onButtonClick: () => void;
}
