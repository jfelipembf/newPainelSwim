import React, { useMemo, useState } from "react";
import { Badge, Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Table } from "reactstrap";

const MOCK_FEES = [
  { id: 1, brand: "Visa", installments: "1x", gateway: "Stone", feePercent: 1.89, feeFixed: 0.40, settlementDays: 2, status: "active" },
  { id: 2, brand: "Visa", installments: "2-6x", gateway: "Stone", feePercent: 2.79, feeFixed: 0.50, settlementDays: 15, status: "active" },
  { id: 3, brand: "Mastercard", installments: "1x", gateway: "Cielo", feePercent: 1.95, feeFixed: 0.35, settlementDays: 2, status: "active" },
  { id: 4, brand: "Mastercard", installments: "7-12x", gateway: "Cielo", feePercent: 3.10, feeFixed: 0.60, settlementDays: 30, status: "active" },
  { id: 5, brand: "Elo", installments: "1x", gateway: "Stone", feePercent: 2.10, feeFixed: 0.45, settlementDays: 2, status: "inactive" },
  { id: 6, brand: "Amex", installments: "1x", gateway: "PagSeguro", feePercent: 2.40, feeFixed: 0.55, settlementDays: 5, status: "active" },
];

const STATUS_MAP = {
  active: { label: "Ativa", color: "success" },
  inactive: { label: "Inativa", color: "secondary" },
};

const FeesPage = () => {
  const [brandFilter, setBrandFilter] = useState("all");
  const [installmentsFilter, setInstallmentsFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFees = useMemo(() => {
    return MOCK_FEES.filter((fee) => {
      const matchesBrand = brandFilter === "all" || fee.brand === brandFilter;
      const matchesInstallments =
        installmentsFilter === "all" || fee.installments === installmentsFilter;
      const matchesStatus = statusFilter === "all" || fee.status === statusFilter;
      const matchesSearch = fee.gateway.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesInstallments && matchesStatus && matchesSearch;
    });
  }, [brandFilter, installmentsFilter, statusFilter, searchTerm]);

  return (
    <div className="mt-4">
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <CardTitle tag="h4" className="mb-1">
                Taxas e tarifas
              </CardTitle>
              <small className="text-muted">Centralize a gestão de tarifas automáticas e penalidades.</small>
            </div>
            <div className="d-flex gap-2">
              <Button color="primary" size="sm">
                Nova taxa
              </Button>
              <Button color="secondary" outline size="sm">
                Configurar regras
              </Button>
            </div>
          </div>

          <Form className="row g-3 mb-4">
            <div className="col-md-4">
              <FormGroup>
                <Label for="brandFilter">Bandeira</Label>
                <Input id="brandFilter" type="select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                  <option value="all">Todas</option>
                  {Array.from(new Set(MOCK_FEES.map((fee) => fee.brand))).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="installmentsFilter">Parcelas</Label>
                <Input
                  id="installmentsFilter"
                  type="select"
                  value={installmentsFilter}
                  onChange={(e) => setInstallmentsFilter(e.target.value)}
                >
                  <option value="all">Qualquer</option>
                  {Array.from(new Set(MOCK_FEES.map((fee) => fee.installments))).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="statusFilter">Status</Label>
                <Input id="statusFilter" type="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Todos</option>
                  <option value="active">Ativas</option>
                  <option value="inactive">Inativas</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="feeSearch">Buscar por adquirente</Label>
                <Input
                  id="feeSearch"
                  type="search"
                  placeholder="Ex.: Stone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="col-md-6 d-flex align-items-end justify-content-end gap-2">
              <Button
                color="light"
                size="sm"
                onClick={() => {
                  setBrandFilter("all");
                  setInstallmentsFilter("all");
                  setStatusFilter("all");
                  setSearchTerm("");
                }}
              >
                Limpar filtros
              </Button>
              <Button color="primary" size="sm">
                Aplicar
              </Button>
            </div>
          </Form>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Bandeira</th>
                  <th>Parcelas</th>
                  <th>Adquirente</th>
                  <th>Prazo repasse</th>
                  <th className="text-end">% Taxa</th>
                  <th className="text-end">Valor fixo</th>
                  <th>Status</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.map((fee) => (
                  <tr key={fee.id}>
                    <td>{fee.brand}</td>
                    <td>{fee.installments}</td>
                    <td>{fee.gateway}</td>
                    <td>{`${fee.settlementDays} dia(s)`}</td>
                    <td className="text-end fw-semibold">{fee.feePercent.toFixed(2)}%</td>
                    <td className="text-end fw-semibold">
                      {fee.feeFixed.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                    <td>
                      <Badge color={STATUS_MAP[fee.status]?.color || "secondary"} className="px-3">
                        {STATUS_MAP[fee.status]?.label || fee.status}
                      </Badge>
                    </td>
                    <td className="text-end d-flex justify-content-end gap-2">
                      <Button size="sm" color="link" className="text-decoration-none">
                        Editar
                      </Button>
                      <Button size="sm" color="danger" outline>
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FeesPage;
