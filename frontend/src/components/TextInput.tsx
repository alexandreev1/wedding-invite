import { TextInput as MantineTextInput } from '@mantine/core';
import { memo, useCallback, type SyntheticEvent } from 'react';
import type { ITextInputProps } from '../types/wedding';
import '../styles/TextInput.less';

function TextInput({ value, onValueChange, label, placeholder }: ITextInputProps) {
    const handleValueChange = useCallback(
        (event: SyntheticEvent<HTMLInputElement>) => {
            onValueChange(event.currentTarget.value);
        },
        [onValueChange],
    );

    return (
        <MantineTextInput
            value={value}
            onChange={handleValueChange}
            radius="xs"
            label={label}
            placeholder={placeholder}
            className="CustomTextInput"
            classNames={{
                input: 'CustomTextInput__input',
                label: 'CustomTextInput__label',
            }}
        />
    );
}

export default memo(TextInput);
