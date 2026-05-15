import { memo } from 'react';
import type { IButtonProps } from '../types/wedding';
import '../styles/Button.less';

function Button({ caption, onButtonClick }: IButtonProps) {
    return (
        <button className="InvitationButton" onClick={onButtonClick}>
            {caption}
        </button>
    );
}

export default memo(Button);
