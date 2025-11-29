import React, { useMemo, useState } from "react";
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Table } from "reactstrap";

const MOCK_FLOW = [
  { id: 1, category: "Mensalidades", inflow: 18250, outflow: 0 },
  { id: 2, category: "Produtos", inflow: 2750, outflow: 0 },
  { id: 3, category: "Folha de pagamento", inflow: 0, outflow: 11200 },
  { id: 4, category: "Infraestrutura", inflow: 0, outflow: 3800 },
  { id: 5, category: "Taxas bancárias", inflow: 0, outflow: 640 },
];

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

const CashFlowPage = () => {
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 7) + "-01");
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [groupBy, setGroupBy] = useState("category");

  const totals = useMemo(() => {
    const inflow = MOCK_FLOW.reduce((acc, row) => acc + row.inflow, 0);
    const outflow = MOCK_FLOW.reduce((acc, row) => acc + row.outflow, 0);
    return { inflow, outflow, balance: inflow - outflow };
  }, []);

  return (
    <div className="mt-4">
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <CardTitle tag="h4" className="mb-1">
                Fluxo de caixa consolidado
              </CardTitle>
              <small className="text-muted">Monitore entradas e saídas por categoria e período.</small>
            </div>
            <div className="d-flex gap-2">
              <Button color="secondary" outline size="sm">
                Exportar
              </Button>
              <Button color="primary" size="sm">
                Atualizar
              </Button>
            </div>
          </div>

          <Form className="row g-3 mb-4">
            <div className="col-md-3">
              <FormGroup>
                <Label for="startDate">Início</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="endDate">Fim</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="groupBy">Agrupar por</Label>
                <Input id="groupBy" type="select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="category">Categoria</option>
                  <option value="week">Semana</option>
                  <option value="month">Mês</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-3 d-flex align-items-end justify-content-end">
              <Button color="light" className="me-2" size="sm">
                Limpar filtros
              </Button>
              <Button color="primary" size="sm">
                Aplicar
              </Button>
            </div>
          </Form>

          <div className="table-responsive">
            <Table bordered hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Categoria</th>
                  <th className="text-end">Entradas</th>
                  <th className="text-end">Saídas</th>
                  <th className="text-end">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_FLOW.map((row) => (
                  <tr key={row.id}>
                    <td>{row.category}</td>
                    <td className="text-end text-success fw-semibold">{formatCurrency(row.inflow)}</td>
                    <td className="text-end text-danger fw-semibold">{formatCurrency(row.outflow)}</td>
                    <td className="text-end fw-semibold">
                      {formatCurrency(row.inflow - row.outflow)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-secondary">
                  <th>Total</th>
                  <th className="text-end">{formatCurrency(totals.inflow)}</th>
                  <th className="text-end">{formatCurrency(totals.outflow)}</th>
                  <th className={`text-end ${totals.balance >= 0 ? "text-success" : "text-danger"}`}>
                    {formatCurrency(totals.balance)}
                  </th>
                </tr>
              </tfoot>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CashFlowPage;
