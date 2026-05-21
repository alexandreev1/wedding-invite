import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useWeddingStore } from '../store/useWeddingStore';
import { TextInput } from '@mantine/core';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import RadioGroup from '../components/RadioGroup';
import '../styles/GuestForm.less';
import {
    GUEST_FORM_BUFFET_ITEMS,
    GUEST_FORM_BUFFET_ITEMS_CAPTIONS,
    GUEST_FORM_ITEMS,
    GUEST_FORM_ITEMS_CAPTIONS,
    HOT_DISH_RADIO_GROUP_CONFIG,
    TRANSFER_RADIO_GROUP_CONFIG,
} from '../shared/constants';

function GuestForm() {
    const { id } = useParams();
    const { fetchGuestData, guestData, patchGuestData, guestFormData } = useWeddingStore();
    const [hotDishRadioGroupValue, setHotDishRadioGroupValue] = useState<string | null>(null);
    const [transferRadioGroupValue, setTransferRadioGroupValue] = useState<string | null>(null);

    const handleSendResultButtonClick = useCallback(() => {
        patchGuestData(
            id,
            null,
            // JSON.stringify({ data1: true, data2: 'abc', data3: { data31: false, data32: 123 } }),
        );
    }, [id]);

    const handleCheckboxValueChange = useCallback(() => {}, []);

    useEffect(() => {
        fetchGuestData(id);
    }, [id]);

    if (!guestData || !guestFormData) {
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
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={
                            GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.SOFT_DRINKS]
                        }
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                </div>
            </div>
            <div className="GuestForm__group">
                <span className="GuestForm__group-caption">Напитки на банкете:</span>
                <div className="GuestForm__group-inputs">
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                    <Checkbox
                        label={GUEST_FORM_BUFFET_ITEMS_CAPTIONS[GUEST_FORM_BUFFET_ITEMS.BEER]}
                        value={
                            guestFormData[GUEST_FORM_ITEMS.BUFFET][
                                GUEST_FORM_BUFFET_ITEMS.SPARKLING_WINE
                            ]
                        }
                        onValueChange={() => handleCheckboxValueChange}
                    />
                </div>
                <TextInput
                    radius="xs"
                    label="Укажи свое пожелание по количеству алкоголя в любом удобном формате:"
                    placeholder="Кр. вино - 1 бутылка; виски - 0,5 л;"
                    classNames={{
                        input: 'GuestForm__group-textInput-input',
                        label: 'GuestForm__group-textInput-label',
                    }}
                />
            </div>
            <RadioGroup
                groupLabel="Горячее блюдо:"
                value={hotDishRadioGroupValue}
                onValueChange={setHotDishRadioGroupValue}
                radioGroupConfig={HOT_DISH_RADIO_GROUP_CONFIG}
            />
            <RadioGroup
                groupLabel="Понадобится ли трансфер:"
                value={transferRadioGroupValue}
                onValueChange={setTransferRadioGroupValue}
                radioGroupConfig={TRANSFER_RADIO_GROUP_CONFIG}
            />
            <Button caption="Отправить" onButtonClick={handleSendResultButtonClick} />
        </div>
    );
}

export default GuestForm;
