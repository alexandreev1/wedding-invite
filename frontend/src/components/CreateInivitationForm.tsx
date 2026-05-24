import { memo, useCallback, useState, type SyntheticEvent } from 'react';
import { useForm } from '@mantine/form';
import { Switch, Text, TextInput, Group, Button } from '@mantine/core';
import type { IGuest, TGender } from '../types/wedding';
import { useWeddingStore } from '../store/useWeddingStore';
import { getAvatarUrl, getToken } from '../shared/utils';
import GenderSwitch from './CreateInvitationForm/GenderSwitch';

function CreateInvitationForm() {
    const { addInvitation } = useWeddingStore();
    const [isPair, setIsPair] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstGuestName: '',
            firstGuestLastname: '',
            firstGuestComment: '',
            firstGuestPhoto: '',
            firstGuestGender: 'male' as TGender,
            secondGuestName: '',
            secondGuestLastname: '',
            secondGuestComment: '',
            secondGuestPhoto: '',
            secondGuestGender: 'female' as TGender,
        },
        validate: {
            firstGuestName: (value) => (value ? null : 'Требуется значение!'),
            firstGuestLastname: (value) => (value ? null : 'Требуется значение!'),
            secondGuestName: (value) => (!isPair || value ? null : 'Требуется значение!'),
            secondGuestLastname: (value) => (!isPair || value ? null : 'Требуется значение!'),
        },
    });

    const handleIsPairChange = useCallback(
        (event: SyntheticEvent<HTMLInputElement>) => setIsPair(event.currentTarget.checked),
        [],
    );

    /* const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setter((prev: any) => ({ ...prev, photo: reader.result }));
            reader.readAsDataURL(file);
        }
    }; */

    const handleFormSubmit = useCallback(
        async (values: typeof form.values) => {
            const invitationId = crypto.randomUUID();
            const guests: IGuest[] = [
                {
                    id: crypto.randomUUID(),
                    invitationId: invitationId,
                    name: values.firstGuestName,
                    lastname: values.firstGuestLastname,
                    comment: values.firstGuestComment,
                    gender: values.firstGuestGender,
                    avatarUrl: getAvatarUrl(values.firstGuestName), // Если нет фото, берем Boring Avatars
                    tableId: null,
                    seatNumber: null,
                    formResult: null,
                },
            ];

            if (isPair) {
                guests.push({
                    id: crypto.randomUUID(),
                    invitationId: invitationId,
                    name: values.secondGuestName,
                    lastname: values.secondGuestLastname,
                    comment: values.secondGuestComment,
                    gender: values.secondGuestGender,
                    avatarUrl: getAvatarUrl(values.secondGuestName),
                    tableId: null,
                    seatNumber: null,
                    formResult: null,
                });
            }

            await addInvitation({
                id: invitationId,
                token: getToken(invitationId),
                guests,
                isRSVP: false,
            });
        },
        [isPair, addInvitation],
    );

    /* const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guest1.name || (isPair && !guest2.name)) {
            return;
        }

        const invitationId = crypto.randomUUID();

        const guests: IGuest[] = [
            {
                id: crypto.randomUUID(),
                invitationId: invitationId,
                name: guest1.name,
                lastname: guest1.lastname,
                comment: guest1.comment,
                gender: guest1.gender,
                avatarUrl: guest1.photo || getAvatarUrl(guest1.name), // Если нет фото, берем Boring Avatars
                tableId: null,
                seatNumber: null,
                formResult: undefined,
            },
        ];

        if (isPair) {
            guests.push({
                id: crypto.randomUUID(),
                invitationId: invitationId,
                name: guest2.name,
                lastname: guest2.lastname,
                comment: guest2.comment,
                gender: guest2.gender,
                avatarUrl: guest2.photo || getAvatarUrl(guest2.name),
                tableId: null,
                seatNumber: null,
                formResult: undefined,
            });
        }

        addInvitation({
            id: invitationId,
            token: getToken(invitationId),
            guests,
            isRSVP: false,
        });
    }; */

    return (
        <>
            <Group align="center" gap={0} justify="space-between" mb="md">
                <Text>Тип приглашения</Text>
                <Switch checked={isPair} onChange={handleIsPairChange} label="Пара" />
            </Group>
            <form
                onSubmit={form.onSubmit(handleFormSubmit)}
                className="border-2  border-gray-400 rounded-md p-2"
            >
                <Group align="center" mb="lg" gap={4}>
                    <GenderSwitch
                        key={form.key('firstGuestGender')}
                        value={form.values.firstGuestGender}
                        onValueChange={(firstGuestGender) => {
                            form.setValues({ ...form.values, firstGuestGender });
                        }}
                    />
                    <TextInput
                        label="Имя"
                        placeholder="Василий"
                        key={form.key('firstGuestName')}
                        withAsterisk
                        {...form.getInputProps('firstGuestName')}
                    />
                    <TextInput
                        label="Фамилия"
                        placeholder="Барбашев"
                        key={form.key('firstGuestLastname')}
                        withAsterisk
                        {...form.getInputProps('firstGuestLastname')}
                    />
                    <TextInput
                        label="Комментарий"
                        placeholder="Друг со стороный жениха"
                        key={form.key('firstGuestComment')}
                        {...form.getInputProps('firstGuestComment')}
                    />
                </Group>
                {isPair && (
                    <Group align="center" mb="lg" gap={4}>
                        <GenderSwitch
                            key={form.key('secondGuestGender')}
                            value={form.values.secondGuestGender}
                            onValueChange={(secondGuestGender) => {
                                form.setValues({ ...form.values, secondGuestGender });
                            }}
                        />
                        <TextInput
                            label="Имя"
                            placeholder="Ольга"
                            key={form.key('secondGuestName')}
                            withAsterisk
                            {...form.getInputProps('secondGuestName')}
                        />
                        <TextInput
                            label="Фамилия"
                            placeholder="Барбашева"
                            key={form.key('secondGuestLastname')}
                            withAsterisk
                            {...form.getInputProps('secondGuestLastname')}
                        />
                        <TextInput
                            label="Комментарий"
                            placeholder="Подруга со стороный жениха, жена Васи"
                            key={form.key('secondGuestComment')}
                            {...form.getInputProps('secondGuestComment')}
                        />
                    </Group>
                )}
                <Group justify="flex-end">
                    <Button type="submit">Создать</Button>
                </Group>
            </form>
        </>
    );
}

export default memo(CreateInvitationForm);
