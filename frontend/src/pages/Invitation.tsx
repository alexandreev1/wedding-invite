import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { useWeddingStore } from '../store/useWeddingStore';
import Location from '../components/Location';
import calendar from '../assets/calendar.svg';
import timingLine from '../assets/timing-line.svg';
import timingRings from '../assets/timing-rings.svg';
import timingDrink from '../assets/timing-drink.svg';
import timingDance from '../assets/timing-dance.svg';
import '../styles/Invitation.less';
import { LOCATIONS_INFO } from '../shared/constants';
import Button from '../components/Button';

const GuestInvite = () => {
    const { token } = useParams();
    const { getInvitation, updateRSVP, currentInvitation, isPair, firstGuest, secondGuest } =
        useWeddingStore();

    const isRSVP = currentInvitation?.isRSVP;

    const guestNames = useMemo(
        () => currentInvitation?.guests.map((g) => g.name).join(' и '),
        [currentInvitation],
    );

    const handleTelegramButtonClick = useCallback(() => {
        window.open('https://t.me/francheskamay', '_blanc', 'noopener,noreferrer');
    }, []);

    const handleSitiingPlanButtonClick = useCallback(() => {
        // asd
    }, []);

    const handleRSVPButtonClick = useCallback(async () => {
        await updateRSVP(token, !isRSVP);
    }, [updateRSVP, token, isRSVP]);

    const handleOpenFormButtonClick = useCallback((guestId: string) => {
        window.open(`/guest-form/${guestId}`, '_blanc', 'noopener,noreferrer');
    }, []);

    useEffect(() => {
        getInvitation(token);
    }, [token]);

    if (!guestNames) {
        return null;
    }

    return (
        <div className="InvitationContent">
            <div className="InvitationContent__firstSection">
                <div className="InvitationContent__firstSection-title">
                    WEDDING
                    <span className="InvitationContent__firstSection-title-sideSign">
                        she said yes
                    </span>
                </div>
                <div className="InvitationContent__firstSection-newlyweds">
                    <div className="InvitationContent__firstSection-newlyweds-names">
                        <span className="InvitationContent__firstSection-newlyweds-names-name">
                            Aleksandr
                        </span>
                        <span className="InvitationContent__firstSection-newlyweds-names-ampersand">
                            &
                        </span>
                        <span className="InvitationContent__firstSection-newlyweds-names-name">
                            Olga
                        </span>
                    </div>
                    <span className="InvitationContent__firstSection-newlyweds-date">
                        11|07|2026
                    </span>
                </div>
                <div className="InvitationContent__firstSection-mainInfo">
                    <div className="InvitationContent__firstSection-mainInfo-addressing">
                        <span>
                            {isPair
                                ? 'Дорогие'
                                : firstGuest?.gender === 'male'
                                  ? 'Дорогой'
                                  : 'Дорогая'}
                        </span>
                        <span>{guestNames}!</span>
                    </div>
                    <div className="InvitationContent__firstSection-mainInfo-invitation">
                        {`Приглашаем ${isPair ? 'вас' : 'тебя'} разделить с нами самое важное, трогательное и особенное
                        событие в нашей жизни — рождение нашей семьи!`}
                    </div>
                    <div className="InvitationContent__firstSection-mainInfo-calendar">
                        <span className="InvitationContent__firstSection-mainInfo-calendar-title">
                            Июль
                        </span>
                        <img
                            className="InvitationContent__firstSection-mainInfo-calendar-img"
                            src={calendar}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="InvitationContent__secondSection">
                <div className="InvitationContent__secondSection-location">
                    <span className="InvitationContent__secondSection-location-title">
                        LOCATION
                    </span>
                    <Location
                        caption={LOCATIONS_INFO.REGISTRY.caption}
                        href={LOCATIONS_INFO.REGISTRY.href}
                    />
                    <Location
                        caption={LOCATIONS_INFO.BANKET.caption}
                        href={LOCATIONS_INFO.BANKET.href}
                    />
                </div>
                <div className="InvitationContent__secondSection-timing">
                    <span className="InvitationContent__secondSection-timing-title">TIMING</span>
                    <div className="InvitationContent__secondSection-timing-content">
                        <div className="InvitationContent__secondSection-timing-content-time">
                            <span>14:00</span>
                            <span>16:00</span>
                            <span>17:00</span>
                            <span>23:00</span>
                        </div>
                        <img src={timingLine} alt="" />
                        <div className="InvitationContent__secondSection-timing-content-events">
                            <span>Роспись в ЗАГС</span>
                            <img src={timingRings} alt="" />
                            <span>Фуршет</span>
                            <img src={timingDrink} alt="" />
                            <span>Банкет</span>
                            <img src={timingDance} alt="" />
                            <span>Окончание вечера</span>
                        </div>
                    </div>
                    <span className="InvitationContent__secondSection-timing-footerSign">
                        mon chéri
                    </span>
                </div>
            </div>
            <div className="InvitationContent__thirdSection">
                <div className="InvitationContent__thirdSection-title">
                    <div>DRESS C</div>
                    <div>ODE</div>
                </div>
                <span className="InvitationContent__thirdSection-caption">
                    {`Мы не хотим ограничивать ${isPair ? 'вас' : 'тебя'} в выборе цветов — ${isPair ? 'ориентируйтесь' : 'ориентируйся'} на образ, в
                    котором ${isPair ? 'вам' : 'тебе'} будет комфортно. Но будем искренне рады, если ${isPair ? 'вам' : 'тебе'} захочется
                    поддержать оттенки нашего праздника.`}
                </span>
                <div className="InvitationContent__thirdSection-colors">
                    <div className="InvitationContent__thirdSection-colors-color1"></div>
                    <div className="InvitationContent__thirdSection-colors-color2"></div>
                    <div className="InvitationContent__thirdSection-colors-color3"></div>
                    <div className="InvitationContent__thirdSection-colors-color4"></div>
                    <div className="InvitationContent__thirdSection-colors-color5"></div>
                </div>
                <span className="InvitationContent__thirdSection-caption">
                    Для дам это могут быть коктейльные или вечерние платья, для мужчин —
                    классические брюки в сочетании с рубашкой.
                </span>
            </div>
            <div className="InvitationContent__fourthSection">
                <span className="InvitationContent__fourthSection-title">DETAILS</span>
                <div className="InvitationContent__fourthSection-caption">
                    {`Если ${isPair ? 'вы заблудились, готовите' : 'ты заблудился, готовишь'} сюрприз или есть какие-то вопросы, ${isPair ? 'вам' : 'тебе'}
                    поможет наш организатор Анастасия`}
                </div>
                <Button caption="@francheskamay" onButtonClick={handleTelegramButtonClick} />
            </div>
            <div className="InvitationContent__fifthSection">
                <span className="InvitationContent__fifthSection-title">SEATING PLAN</span>
                <span className="InvitationContent__fifthSection-caption">
                    Нажав на кнопку ниже можно узнать своё место в зале
                </span>
                <span className="InvitationContent__fifthSection-caption_feature">
                    Скоро здесь появится план рассадки. Следите за обновлениями ;)
                </span>
                <Button
                    caption="посмотреть план"
                    onButtonClick={handleSitiingPlanButtonClick}
                    disabled
                />
            </div>
            <div className="InvitationContent__sixthSection">
                {!isRSVP && (
                    <span className="InvitationContent__sixthSection-caption">
                        Мы просим {isPair ? 'вас' : 'тебя'} подтвердить присутствие и заполнить
                        анкету
                    </span>
                )}
                {isRSVP && (
                    <div className="InvitationContent__sixthSection-pollGroups">
                        {firstGuest && (
                            <div className="InvitationContent__sixthSection-pollGroups-item">
                                {secondGuest && (
                                    <span className="InvitationContent__sixthSection-caption InvitationContent__sixthSection-caption_small">
                                        {firstGuest.name}, просим заполнить анкету:
                                    </span>
                                )}
                                <Button
                                    caption="анкета"
                                    onButtonClick={() => handleOpenFormButtonClick(firstGuest.id)}
                                />
                            </div>
                        )}
                        {secondGuest && (
                            <div className="InvitationContent__sixthSection-pollGroups-item">
                                <span className="InvitationContent__sixthSection-caption InvitationContent__sixthSection-caption_small">
                                    {secondGuest.name}, просим заполнить анкету:
                                </span>
                                <Button
                                    caption="анкета"
                                    onButtonClick={() => handleOpenFormButtonClick(secondGuest.id)}
                                />
                            </div>
                        )}
                    </div>
                )}
                <Button
                    caption={!isRSVP ? (isPair ? 'мы придём' : 'я приду') : 'Отменить присутствие'}
                    viewMode={isRSVP ? 'link' : 'regular'}
                    onButtonClick={handleRSVPButtonClick}
                />
            </div>
            {isRSVP && (
                <div className="InvitationContent__seventhSection">
                    <span className="InvitationContent__seventhSection-caption">
                        До скорой встречи!
                    </span>
                </div>
            )}
        </div>
    );
};

export default GuestInvite;
