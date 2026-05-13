import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IInvitation } from "../types/wedding";
import { api } from "../shared/api";
import { FullScreenLoader } from "../shared/ui/Spinner";
import "../styles/Invitation.less";

const GuestInvite = () => {
  const { token } = useParams();
  const [invite, setInvite] = useState<IInvitation | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadInvite = async () => {
      try {
        const res = await api.get(`/invitation-by-token/${token}`);
        setInvite(res.data);
      } catch (err) {
        setError(true);
      }
    };
    loadInvite();
  }, [token]);

  if (error)
    return <div>Извините, приглашение не найдено или ссылка неверна.</div>;
  if (!invite) return <FullScreenLoader />;

  const guestNames = invite.guests.map((g) => g.name).join(" и ");

  return (
    <div className="InvitationContent">
      <div className="InvitationContent__header">
        <div className="InvitationContent__header-title">
          WEDDING
          <span className="InvitationContent__header-title-sideSign">
            she said yes
          </span>
        </div>
        <div className="InvitationContent__header-newlyweds">
          <div className="InvitationContent__header-newlyweds-names">
            <span className="InvitationContent__header-newlyweds-names-name">
              Aleksandr
            </span>
            <span className="InvitationContent__header-newlyweds-names-ampersand">
              &
            </span>
            <span className="InvitationContent__header-newlyweds-names-name">
              Olga
            </span>
          </div>
          <span className="InvitationContent__header-newlyweds-date">
            11|07|2026
          </span>
        </div>
        <div className="InvitationContent__header-mainInfo">
          <div className="InvitationContent__header-mainInfo-addressing">
            <span>Дорогие,</span>
            <span>{guestNames}!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestInvite;
