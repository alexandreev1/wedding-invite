import { memo, useCallback, useLayoutEffect, useState, type SyntheticEvent } from 'react';
import { useForm } from '@mantine/form';
import { Switch, Text, TextInput, Group, Button } from '@mantine/core';
import type { IGuest, IInvitationFormProps } from '../types/wedding';
import { useWeddingStore } from '../store/useWeddingStore';
import { getFormInitialData, getInitialGuestInfo, getToken } from '../shared/utils';
import GenderSwitch from './InvitationForm/GenderSwitch';

function InvitationForm({ invitation, closeFormCallback }: IInvitationFormProps) {
    const { addInvitation, updateGuests } = useWeddingStore();
    const [isPair, setIsPair] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: getFormInitialData(invitation),
        validate: {
            firstGuestName: (value: string) => (value ? null : 'Требуется значение!'),
            firstGuestLastname: (value: string) => (value ? null : 'Требуется значение!'),
            secondGuestName: (value: string) => (!isPair || value ? null : 'Требуется значение!'),
            secondGuestLastname: (value: string) =>
                !isPair || value ? null : 'Требуется значение!',
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
            const guests: IGuest[] = [];

            if (invitation) {
                const [guest1, guest2] = invitation.guests;

                guests.push({
                    ...guest1,
                    name: values.firstGuestName?.trim(),
                    lastname: values.firstGuestLastname?.trim(),
                    comment: values.firstGuestComment?.trim(),
                    gender: values.firstGuestGender,
                });

                const secondGuest =
                    guest2 ||
                    getInitialGuestInfo({
                        invitationId: invitation.id,
                        name: values.secondGuestName?.trim(),
                        lastname: values.secondGuestLastname?.trim(),
                        comment: values.secondGuestComment?.trim(),
                        gender: values.secondGuestGender,
                    });

                if (isPair) {
                    guests.push({
                        ...secondGuest,
                        name: values.secondGuestName?.trim(),
                        lastname: values.secondGuestLastname?.trim(),
                        comment: values.secondGuestComment?.trim(),
                        gender: values.secondGuestGender,
                    });
                }

                await updateGuests(invitation.token, guests);
                return closeFormCallback();
            }

            const invitationId = crypto.randomUUID();

            guests.push(
                getInitialGuestInfo({
                    invitationId,
                    name: values.firstGuestName?.trim(),
                    lastname: values.firstGuestLastname?.trim(),
                    comment: values.firstGuestComment?.trim(),
                    gender: values.firstGuestGender,
                }),
            );

            if (isPair) {
                guests.push(
                    getInitialGuestInfo({
                        invitationId,
                        name: values.secondGuestName?.trim(),
                        lastname: values.secondGuestLastname?.trim(),
                        comment: values.secondGuestComment?.trim(),
                        gender: values.secondGuestGender,
                    }),
                );
            }

            await addInvitation({
                id: invitationId,
                token: getToken(invitationId),
                guests,
                isRSVP: false,
            });

            return closeFormCallback();
        },
        [isPair, addInvitation, closeFormCallback, invitation],
    );

    useLayoutEffect(() => {
        if (invitation) {
            setIsPair(invitation.guests.length > 1);
        }
    }, [invitation]);

    return (
        <form onSubmit={form.onSubmit(handleFormSubmit)} className="p-6">
            <Group align="center" gap={0} justify="space-between" mb="md">
                <Text>Тип приглашения</Text>
                <Switch checked={isPair} onChange={handleIsPairChange} label="Пара" />
            </Group>
            <Group align="center" mb="lg" gap={4}>
                <GenderSwitch
                    key={form.key('firstGuestGender')}
                    value={form.values.firstGuestGender}
                    onValueChange={(firstGuestGender) => {
                        form.setValues({ ...form.values, firstGuestGender });
                    }}
                />
                <TextInput
                    className="w-full"
                    label="Имя"
                    placeholder="Василий"
                    key={form.key('firstGuestName')}
                    withAsterisk
                    {...form.getInputProps('firstGuestName')}
                />
                <TextInput
                    className="w-full"
                    label="Фамилия"
                    placeholder="Барбашев"
                    key={form.key('firstGuestLastname')}
                    withAsterisk
                    {...form.getInputProps('firstGuestLastname')}
                />
                <TextInput
                    className="w-full"
                    label="Комментарий"
                    placeholder="Друг со стороны жениха"
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
                        className="w-full"
                        label="Имя"
                        placeholder="Ольга"
                        key={form.key('secondGuestName')}
                        withAsterisk
                        {...form.getInputProps('secondGuestName')}
                    />
                    <TextInput
                        className="w-full"
                        label="Фамилия"
                        placeholder="Барбашева"
                        key={form.key('secondGuestLastname')}
                        withAsterisk
                        {...form.getInputProps('secondGuestLastname')}
                    />
                    <TextInput
                        className="w-full"
                        label="Комментарий"
                        placeholder="Подруга со стороный жениха, жена Васи"
                        key={form.key('secondGuestComment')}
                        {...form.getInputProps('secondGuestComment')}
                    />
                </Group>
            )}
            <Group justify="flex-end">
                <Button type="submit">{invitation ? 'Изменить' : 'Создать'}</Button>
            </Group>
        </form>
    );
}

export default memo(InvitationForm);
