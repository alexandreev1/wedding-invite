import { memo } from 'react';
import { Radio as MantineRadio, Group } from '@mantine/core';
import type { IRadioGroupProps } from '../types/wedding';
import '../styles/RadioGroup.less';

function RadioGroup({ groupLabel, value, onValueChange, radioGroupConfig }: IRadioGroupProps) {
    return (
        <MantineRadio.Group
            value={value}
            onChange={onValueChange}
            label={groupLabel}
            className="RadioGroup"
            classNames={{ label: 'RadioGroup__groupLabel' }}
        >
            <Group gap="sm" className="RadioGroup__group">
                {radioGroupConfig.map((item) => (
                    <MantineRadio
                        value={item.value}
                        label={item.label}
                        color="#710912"
                        variant="outline"
                        classNames={{ label: 'RadioGroup__label', radio: 'RadioGroup__input' }}
                    />
                ))}
            </Group>
        </MantineRadio.Group>
    );
}

export default memo(RadioGroup);
