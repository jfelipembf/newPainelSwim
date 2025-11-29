import React from "react";
import PropTypes from "prop-types";
import { Badge, Button, Card, CardBody, Col, Row } from "reactstrap";

const MemberProfileHeader = ({
  member,
  displayName,
  memberStatusLabel,
  membershipStatusLabel,
  branchName,
  registerDate,
  coverImage,
  onBack,
  onEdit,
}) => {
  const addressLine = [member.address, member.number].filter(Boolean).join(", ");
  const neighborhoodLine = member.neighborhood || null;
  const cityLine = [member.city, member.state].filter(Boolean).join(" / ");
  const countryLine = member.country || null;

  const coverStyle = {
    backgroundImage:
      `linear-gradient(135deg, rgba(43,58,74,0.75) 0%, rgba(43,58,74,0.85) 100%), url(${coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "170px",
  };

  return (
    <Card className="border-0 shadow-sm mb-4 overflow-hidden">
      <div className="w-100" style={coverStyle} />
      <CardBody className="pt-0 pb-4" style={{ paddingTop: "2.5rem" }}>
        <Row className="align-items-end">
          <Col md="auto">
            <div className="position-relative" style={{ marginTop: "-72px" }}>
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={displayName}
                  className="rounded-circle avatar-xl border border-white border-3 shadow-sm"
                />
              ) : (
                <div className="avatar-xl rounded-circle bg-white text-primary d-flex align-items-center justify-content-center border border-white border-3 shadow-sm">
                  <span className="fs-1 fw-bold">{displayName?.charAt(0)?.toUpperCase() || "?"}</span>
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2 mt-2">
                <h3 className="mb-0">{displayName}</h3>
                {membershipStatusLabel && (
                  <Badge color="info" className="px-3 py-2">
                    {membershipStatusLabel}
                  </Badge>
                )}
                {memberStatusLabel && memberStatusLabel !== "—" && (
                  <Badge color="secondary" className="px-3 py-2">
                    {memberStatusLabel}
                  </Badge>
                )}
                {member.accessBlocked && (
                  <Badge color="danger" className="px-3 py-2">
                    Acesso Bloqueado
                  </Badge>
                )}
              </div>
              <div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
                {member.displayId && (
                  <span className="d-inline-flex align-items-center gap-1 fw-semibold text-primary">
                    <i className="mdi mdi-identifier" />
                    {String(member.displayId).padStart(5, "0")}
                  </span>
                )}
                {branchName && branchName !== "—" && (
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="mdi mdi-map-marker" />
                    {branchName}
                  </span>
                )}
                {registerDate && registerDate !== "—" && (
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="mdi mdi-calendar-range" />
                    Cadastro {registerDate}
                  </span>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 text-muted">
              {member.email && (
                <a href={`mailto:${member.email}`} className="text-reset text-decoration-none d-inline-flex align-items-center gap-2">
                  <i className="mdi mdi-email-open-outline text-primary" />
                  {member.email}
                </a>
              )}
              {member.phone && (
                <a
                  href={`https://wa.me/55${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none d-inline-flex align-items-center gap-2"
                >
                  <i className="mdi mdi-whatsapp text-success" />
                  {member.phone}
                </a>
              )}
            </div>
            <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 mt-3 text-muted small">
              {addressLine && <span>{addressLine}</span>}
              {neighborhoodLine && <span>{neighborhoodLine}</span>}
              {cityLine && <span>{cityLine}</span>}
              {countryLine && <span>{countryLine}</span>}
            </div>
          </Col>
          <Col md="auto" className="mt-3 mt-md-0">
            <div className="d-flex gap-2">
              <Button color="light" onClick={onBack} className="d-flex align-items-center gap-2">
                <i className="mdi mdi-arrow-left" />
                Voltar
              </Button>
              <Button color="primary" onClick={onEdit} className="d-flex align-items-center gap-2">
                <i className="mdi mdi-pencil" />
                Editar
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

MemberProfileHeader.propTypes = {
  member: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
  memberStatusLabel: PropTypes.string,
  membershipStatusLabel: PropTypes.string,
  branchName: PropTypes.string,
  registerDate: PropTypes.string,
  coverImage: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

MemberProfileHeader.defaultProps = {
  memberStatusLabel: "—",
  membershipStatusLabel: "",
  branchName: "—",
  registerDate: "—",
  coverImage: "",
};

export default MemberProfileHeader;
