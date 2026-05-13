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
          <span className="InvitationContent__header-title_sideSign">
            she said yes
          </span>
        </div>
        <div className="InvitationContent__header-newlyweds">
          <div></div>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default GuestInvite;
