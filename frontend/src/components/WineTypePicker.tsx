import { memo } from 'react';
import { SegmentedControl } from '@mantine/core';
import type { IWineTypePicker } from '../types/wedding';
import { WINE_TYPE_DATA } from '../shared/constants';

function WineTypePicker({ value, onValueChange }: IWineTypePicker) {
    return (
        <SegmentedControl
            value={value}
            onChange={onValueChange}
            size="xs"
            radius="xs"
            color="#710912"
            data={WINE_TYPE_DATA}
        />
    );
}

export default memo(WineTypePicker);
