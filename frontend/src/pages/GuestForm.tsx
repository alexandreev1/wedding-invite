import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useWeddingStore } from '../store/useWeddingStore';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import TextInput from '../components/TextInput';
import '../styles/GuestForm.less';
import {
    GUEST_FORM_BANQUET_ITEMS,
    GUEST_FORM_BANQUET_ITEMS_CAPTIONS,
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS_CAPTIONS,
    GUEST_FORM_ITEMS,
    GUEST_FORM_ITEMS_CAPTIONS,
    HOT_DISH_RADIO_GROUP_CONFIG,
    TRANSFER_RADIO_GROUP_CONFIG,
} from '../shared/constants';
import { useSurveyStore } from '../store/useSurveyStore';
import { getInitialGuestFormData } from '../shared/utils';
import WineTypePicker from '../components/WineTypePicker';

function GuestForm() {
    const { id } = useParams();
    const { fetchGuestData, guestData, patchGuestData } = useWeddingStore();
    const { initForm, formData, updateBaseField, updateNestedField } = useSurveyStore();

    const handleSendResultButtonClick = useCallback(async () => {
        try {
            await patchGuestData(id, JSON.stringify(formData));
            notifications.show({
                title: 'Готово!',
                message: 'Анкета успешно сохранена',
                color: 'green',
                autoClose: true,
            });
        } catch (_error) {
            notifications.show({
                title: 'УПС!',
                message: 'Что-то пошло не так, анкета не сохранилась',
                color: 'red',
                autoClose: true,
            });
        }
    }, [id, formData]);

    const handleCheckboxValueChange = useCallback(
        (
            newValue: string | boolean,
            item: GUEST_FORM_ITEMS,
            nestedProp?: GUEST_FORM_BUFFET_ITEMS | GUEST_FORM_BANQUET_ITEMS,
        ) => {
            if (nestedProp) {
                return updateNestedField(item, nestedProp, newValue);
            }

            updateBaseField(item, newValue);
        },
        [updateBaseField, updateNestedField],
    );

    useEffect(() => {
        fetchGuestData(id);
    }, [fetchGuestData, id]);

    useEffect(() => {
        const guestFormData =
            (guestData?.formResult && JSON.parse(guestData.formResult)) ||
            getInitialGuestFormData();
        initForm(guestFormData);
    }, [guestData, initForm]);

    if (!guestData || !formData) {
        return null;
    }

    return (
        <div className="GuestForm">
            <span className="GuestForm__title">GUEST FORM</span>
            <div className="GuestForm__group">
                <span className="GuestForm__group-caption">
                    {GUEST_FORM_ITEMS_CAPTIONS[GUEST_FORM_ITEMS.BUFFET]}:
                </span>
                <div className="GuestForm__group-inputs">
                    <Checkbox
                        label={
                            GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE]
                        }
                        value={
                            formData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BUFFET,
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE,
                            )
                        }
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={formData[GUEST_FORM_ITEMS.BUFFET][GUEST_FORM_BUFFET_ITEMS.BEER]}
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BUFFET,
                                GUEST_FORM_BUFFET_ITEMS.BEER,
                            )
                        }
                    />
                    <Checkbox
                        label={
                            GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]
                        }
                        value={
                            formData[GUEST_FORM_ITEMS.BUFFET][GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]
                        }
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BUFFET,
                                GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS,
                            )
                        }
                    />
                </div>
            </div>
            <div className="GuestForm__group">
                <span className="GuestForm__group-caption">
                    {GUEST_FORM_ITEMS_CAPTIONS[GUEST_FORM_ITEMS.BANQUET]}:
                </span>
                <div className="GuestForm__group-inputs">
                    <Checkbox
                        label={
                            GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        value={
                            formData[GUEST_FORM_ITEMS.BANQUET][
                                GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BANQUET,
                                GUEST_FORM_BANQUET_ITEMS.SPARKLING_WINE,
                            )
                        }
                    />
                    <div className="GuestForm__group-inputs_withType">
                        <Checkbox
                            label={
                                GUEST_FORM_BANQUET_ITEMS_CAPTIONS[GUEST_FORM_BANQUET_ITEMS.RED_WINE]
                            }
                            value={
                                formData[GUEST_FORM_ITEMS.BANQUET][
                                    GUEST_FORM_BANQUET_ITEMS.RED_WINE
                                ]
                            }
                            onValueChange={(newValue) =>
                                handleCheckboxValueChange(
                                    newValue,
                                    GUEST_FORM_ITEMS.BANQUET,
                                    GUEST_FORM_BANQUET_ITEMS.RED_WINE,
                                )
                            }
                        />
                        {formData[GUEST_FORM_ITEMS.BANQUET][GUEST_FORM_BANQUET_ITEMS.RED_WINE] && (
                            <WineTypePicker
                                value={
                                    formData[GUEST_FORM_ITEMS.BANQUET][
                                        GUEST_FORM_BANQUET_ITEMS.RED_WINE_TYPE
                                    ]
                                }
                                onValueChange={(newValue) =>
                                    handleCheckboxValueChange(
                                        newValue,
                                        GUEST_FORM_ITEMS.BANQUET,
                                        GUEST_FORM_BANQUET_ITEMS.RED_WINE_TYPE,
                                    )
                                }
                            />
                        )}
                    </div>
                    <div className="GuestForm__group-inputs_withType">
                        <Checkbox
                            label={
                                GUEST_FORM_BANQUET_ITEMS_CAPTIONS[
                                    GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                                ]
                            }
                            value={
                                formData[GUEST_FORM_ITEMS.BANQUET][
                                    GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                                ]
                            }
                            onValueChange={(newValue) =>
                                handleCheckboxValueChange(
                                    newValue,
                                    GUEST_FORM_ITEMS.BANQUET,
                                    GUEST_FORM_BANQUET_ITEMS.WHITE_WINE,
                                )
                            }
                        />
                        {formData[GUEST_FORM_ITEMS.BANQUET][
                            GUEST_FORM_BANQUET_ITEMS.WHITE_WINE
                        ] && (
                            <WineTypePicker
                                value={
                                    formData[GUEST_FORM_ITEMS.BANQUET][
                                        GUEST_FORM_BANQUET_ITEMS.WHITE_WINE_TYPE
                                    ]
                                }
                                onValueChange={(newValue) =>
                                    handleCheckboxValueChange(
                                        newValue,
                                        GUEST_FORM_ITEMS.BANQUET,
                                        GUEST_FORM_BANQUET_ITEMS.WHITE_WINE_TYPE,
                                    )
                                }
                            />
                        )}
                    </div>
                    <Checkbox
                        label={GUEST_FORM_BANQUET_ITEMS_CAPTIONS[GUEST_FORM_BANQUET_ITEMS.WHISKEY]}
                        value={formData[GUEST_FORM_ITEMS.BANQUET][GUEST_FORM_BANQUET_ITEMS.WHISKEY]}
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BANQUET,
                                GUEST_FORM_BANQUET_ITEMS.WHISKEY,
                            )
                        }
                    />
                    <Checkbox
                        label={GUEST_FORM_BANQUET_ITEMS_CAPTIONS[GUEST_FORM_BANQUET_ITEMS.COGNAC]}
                        value={formData[GUEST_FORM_ITEMS.BANQUET][GUEST_FORM_BANQUET_ITEMS.COGNAC]}
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BANQUET,
                                GUEST_FORM_BANQUET_ITEMS.COGNAC,
                            )
                        }
                    />
                    <Checkbox
                        label={
                            GUEST_FORM_BANQUET_ITEMS_CAPTIONS[GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS]
                        }
                        value={
                            formData[GUEST_FORM_ITEMS.BANQUET][GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS]
                        }
                        onValueChange={(newValue) =>
                            handleCheckboxValueChange(
                                newValue,
                                GUEST_FORM_ITEMS.BANQUET,
                                GUEST_FORM_BANQUET_ITEMS.SOFT_DRINKS,
                            )
                        }
                    />
                </div>
                <TextInput
                    value={
                        formData[GUEST_FORM_ITEMS.BANQUET][GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO]
                    }
                    onValueChange={(newValue) =>
                        handleCheckboxValueChange(
                            newValue,
                            GUEST_FORM_ITEMS.BANQUET,
                            GUEST_FORM_BANQUET_ITEMS.ADDITIONAL_INFO,
                        )
                    }
                    label="Укажи свое пожелание по количеству алкоголя в любом удобном формате:"
                    placeholder="Кр. вино - 1 бутылка; виски - 0,5 л;"
                />
            </div>
            <RadioGroup
                groupLabel="Горячее блюдо:"
                value={formData[GUEST_FORM_ITEMS.HOT_DISH]}
                onValueChange={(newValue) =>
                    handleCheckboxValueChange(newValue, GUEST_FORM_ITEMS.HOT_DISH)
                }
                radioGroupConfig={HOT_DISH_RADIO_GROUP_CONFIG}
            />
            <RadioGroup
                groupLabel="Понадобится ли трансфер:"
                value={formData[GUEST_FORM_ITEMS.TRANSFER]}
                onValueChange={(newValue) =>
                    handleCheckboxValueChange(newValue, GUEST_FORM_ITEMS.TRANSFER)
                }
                radioGroupConfig={TRANSFER_RADIO_GROUP_CONFIG}
            />
            <Button
                caption={guestData?.formResult ? 'Изменить' : 'Отправить'}
                onButtonClick={handleSendResultButtonClick}
            />
        </div>
    );
}

export default GuestForm;
