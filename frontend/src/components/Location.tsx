import { memo, useCallback } from 'react';
import Button from './Button';
import type { ILocationProps } from '../types/wedding';
import locationIcon from '../assets/icon-location.svg';
import '../styles/Location.less';

function Location({ caption, href }: ILocationProps) {
    const handleLocationButtonClick = useCallback(() => {
        if (!href) {
            return;
        }

        window.open(href, '_blanc', 'noopener,noreferrer');
    }, [href]);

    return (
        <div className="LocationContent">
            <div className="LocationContent__content">
                <img src={locationIcon} alt="" />
                <div className="LocationContent__content-caption">{caption}</div>
            </div>
            <Button caption="локация" onButtonClick={handleLocationButtonClick} />
        </div>
    );
}

export default memo(Location);
