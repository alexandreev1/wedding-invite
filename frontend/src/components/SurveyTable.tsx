import { memo, useMemo } from 'react';
import { Table } from '@mantine/core';
import { useWeddingStore } from '../store/useWeddingStore';
import '../styles/SurveyTable.less';
import type { IGuestFormResult } from '../types/wedding';
import {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BANQUET_ITEMS_CAPTIONS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS_CAPTIONS,
    GUEST_FORM_ITEMS,
    GUEST_FORM_WINE_SORTS_CAPTIONS,
    HOT_DISH_CAPTIONS,
    TRANSFER_CAPTIONS,
} from '../shared/constants';

function SurveyTable() {
    const { getAllGuests } = useWeddingStore();

    const guests = useMemo(() => getAllGuests(), [getAllGuests]);

    if (!guests) {
        return null;
    }

    return (
        <div className="h-full w-full p-6">
            <Table stickyHeader stickyHeaderOffset={20} withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Имя гостя</Table.Th>
                        <Table.Th>Напитки на фуршете</Table.Th>
                        <Table.Th>Напитки на банкете</Table.Th>
                        <Table.Th>Тип вина</Table.Th>
                        <Table.Th>Доп. информация</Table.Th>
                        <Table.Th>Горячее блюдо</Table.Th>
                        <Table.Th>Трансфер</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {guests.map((guest) => {
                        const guestFormData =
                            guest.formResult && (JSON.parse(guest.formResult) as IGuestFormResult);
                        return (
                            <Table.Tr key={guest.id}>
                                <Table.Td>
                                    <div>
                                        <div>{`${guest.name} ${guest.lastname}`}</div>
                                        {guest.comment && <div>({guest.comment})</div>}
                                    </div>
                                </Table.Td>
                                {!guestFormData ? (
                                    <Table.Td>Форма пуста</Table.Td>
                                ) : (
                                    <>
                                        <Table.Td>
                                            {guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BUFFET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                                GUEST_FORM_BUFFET_ITEMS.BEER
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BUFFET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BUFFET_ITEMS.BEER
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                                GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BUFFET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.RED_WINE
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.RED_WINE
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.WHISKEY
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.WHISKEY
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.COGNAC
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.COGNAC
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS
                                            ] && (
                                                <div>
                                                    {
                                                        GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                                            GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.RED_WINE
                                            ] && (
                                                <div>
                                                    Красное вино: &nbsp;
                                                    {
                                                        GUEST_FORM_WINE_SORTS_CAPTIONS[
                                                            guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                                GUEST_FORM_BANQUET_ITEMS
                                                                    .RED_WINE_TYPE
                                                            ]
                                                        ]
                                                    }
                                                </div>
                                            )}
                                            {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                                            ] && (
                                                <div>
                                                    Белое вино: &nbsp;
                                                    {
                                                        GUEST_FORM_WINE_SORTS_CAPTIONS[
                                                            guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                                GUEST_FORM_BANQUET_ITEMS
                                                                    .WHITE_WINE_TYPE
                                                            ]
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            {
                                                guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                    GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO
                                                ]
                                            }
                                        </Table.Td>
                                        <Table.Td>
                                            {guestFormData[GUEST_FORM_ITEMS.HOT_DISH] &&
                                                HOT_DISH_CAPTIONS[
                                                    guestFormData[GUEST_FORM_ITEMS.HOT_DISH]
                                                ]}
                                        </Table.Td>
                                        <Table.Td>
                                            {guestFormData[GUEST_FORM_ITEMS.TRANSFER] &&
                                                TRANSFER_CAPTIONS[
                                                    guestFormData[GUEST_FORM_ITEMS.TRANSFER]
                                                ]}
                                        </Table.Td>
                                    </>
                                )}
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </div>
    );
}

export default memo(SurveyTable);
