import { memo, useMemo } from 'react';
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
        <div className="SurveyTable">
            <div className="SurveyTable__row">
                <div className="SurveyTable__column">Имя гостя</div>
                <div className="SurveyTable__column">Напитки на фуршете</div>
                <div className="SurveyTable__column">Напитки на банкете</div>
                <div className="SurveyTable__column">Тип вина</div>
                <div className="SurveyTable__column">Доп. информация</div>
                <div className="SurveyTable__column">Горячее блюдо</div>
                <div className="SurveyTable__column">Трансфер</div>
            </div>
            {guests.map((guest) => {
                const guestFormData =
                    guest.formResult && (JSON.parse(guest.formResult) as IGuestFormResult);

                return (
                    <div className="SurveyTable__row">
                        <div className="SurveyTable__column">{guest.name}</div>
                        {!guestFormData ? (
                            <div className="SurveyTable__column">Форма пуста</div>
                        ) : (
                            <>
                                <div className="SurveyTable__column">
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
                                </div>
                                <div className="SurveyTable__column">
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
                                </div>
                                <div className="SurveyTable__column">
                                    {guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                        GUEST_FORM_BANQUET_ITEMS.RED_WINE
                                    ] && (
                                        <div>
                                            Красное вино: &nbsp;
                                            {
                                                GUEST_FORM_WINE_SORTS_CAPTIONS[
                                                    guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                                        GUEST_FORM_BANQUET_ITEMS.RED_WINE_TYPE
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
                                                        GUEST_FORM_BANQUET_ITEMS.WHITE_WINE_TYPE
                                                    ]
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="SurveyTable__column">
                                    {
                                        guestFormData[GUEST_FORM_ITEMS.BANQUET][
                                            GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO
                                        ]
                                    }
                                </div>
                                <div className="SurveyTable__column">
                                    {guestFormData[GUEST_FORM_ITEMS.HOT_DISH] &&
                                        HOT_DISH_CAPTIONS[guestFormData[GUEST_FORM_ITEMS.HOT_DISH]]}
                                </div>
                                <div className="SurveyTable__column">
                                    {guestFormData[GUEST_FORM_ITEMS.TRANSFER] &&
                                        TRANSFER_CAPTIONS[guestFormData[GUEST_FORM_ITEMS.TRANSFER]]}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default memo(SurveyTable);
