import { memo, useCallback } from 'react';
import type { ILocationProps } from '../types/wedding';
import locationIcon from '../assets/icon-location.svg';
import '../styles/Location.less';

function Location({ caption, href }: ILocationProps) {
    const handleLocationButtunClick = useCallback(() => {
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
            <button className="LocationContent__button" onClick={handleLocationButtunClick}>
                Локация
            </button>
        </div>
    );
}

export default memo(Location);
