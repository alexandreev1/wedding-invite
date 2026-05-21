import { memo, useCallback, type SyntheticEvent } from 'react';
import { Checkbox as MantineCheckbox } from '@mantine/core';
import type { ICheckboxProps } from '../types/wedding';
import '../styles/Checkbox.less';

function Checkbox({ label, value, onValueChange }: ICheckboxProps) {
    const handleCheckboxStateChange = useCallback(
        (event: SyntheticEvent<HTMLInputElement>) => {
            onValueChange(event.currentTarget.checked);
        },
        [onValueChange],
    );

    return (
        <MantineCheckbox
            className="MyCustomCheckbox"
            classNames={{ input: 'MyCustomCheckbox__input', label: 'MyCustomCheckbox__label' }}
            checked={value}
            label={label}
            color="#710912"
            variant="outline"
            radius="xs"
            onChange={handleCheckboxStateChange}
        />
    );
}

export default memo(Checkbox);
