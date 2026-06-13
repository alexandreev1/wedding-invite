import { memo, useCallback, type SyntheticEvent } from 'react';
import { Switch } from '@mantine/core';
import { Mars, Venus } from 'lucide-react';
import type { TGender } from '../../types/wedding';

function GenderSwitch({
    value,
    onValueChange,
}: {
    value: TGender;
    onValueChange: (newValue: TGender) => void;
}) {
    const checked = value === 'male';
    const handleSwitchCheckedChange = useCallback(
        (event: SyntheticEvent<HTMLInputElement>) =>
            onValueChange(event.currentTarget.checked ? 'male' : 'female'),
        [onValueChange],
    );

    return (
        <Switch
            checked={checked}
            onChange={handleSwitchCheckedChange}
            thumbIcon={
                checked ? (
                    <Mars size={12} color="var(--mantine-color-teal-6)" />
                ) : (
                    <Venus size={12} color="var(--mantine-color-red-6)" />
                )
            }
        />
    );
}

export default memo(GenderSwitch);
