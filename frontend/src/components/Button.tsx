import { memo } from 'react';
import { clsx } from 'clsx';
import type { IButtonProps } from '../types/wedding';
import '../styles/Button.less';

function Button({ caption, viewMode = 'regular', disabled, onButtonClick }: IButtonProps) {
    return (
        <button
            className={clsx(
                'InvitationButton',
                `InvitationButton__${viewMode}`,
                disabled && 'InvitationButton__disabled',
            )}
            disabled={disabled}
            onClick={onButtonClick}
        >
            {caption}
        </button>
    );
}

export default memo(Button);
