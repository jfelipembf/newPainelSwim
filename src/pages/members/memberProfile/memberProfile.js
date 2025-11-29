import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

import MemberProfileHeader from "./components/header";
import swimBackground from "../../../assets/images/swim.jpg";

const MemberProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const member = location.state?.member;

  if (!member) {
    return (
      <Card className="mt-4">
        <CardBody className="text-center py-5">
          <i className="mdi mdi-alert-circle-outline display-4 text-muted" />
          <p className="mt-3">Selecione um cliente na lista para visualizar o perfil.</p>
          <Button color="primary" onClick={() => navigate("/admin/members")}>Voltar para lista</Button>
        </CardBody>
      </Card>
    );
  }

  const memberStatusLabel = member.statusLabel || "—";
  const membershipStatusLabel = member.membershipStatusLabel || member.membershipStatus || "";
  const displayName =
    member.fullName ||
    [member.firstName, member.lastName].filter(Boolean).join(" ") ||
    "—";

  const branchName = member.branchName || "—";
  const registerDate = member.registerDate || "—";

  return (
    <div className="member-profile-page">
      <MemberProfileHeader
        member={member}
        displayName={displayName}
        memberStatusLabel={memberStatusLabel}
        membershipStatusLabel={membershipStatusLabel}
        branchName={branchName}
        registerDate={registerDate}
        coverImage={swimBackground}
        onBack={() => navigate("/admin/members")}
        onEdit={() => navigate(`/members/editar/${id}`)}
      />

      <Card className="border-0 shadow-sm">
        <CardBody className="text-center py-5">
          <i className="mdi mdi-information-outline display-4 text-muted mb-3" />
          <p className="text-muted mb-2">Detalhes completos do membro estarão disponíveis em breve.</p>
          <p className="text-muted mb-0">Por enquanto, exibimos apenas o cabeçalho com os dados principais.</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default MemberProfile;
