import React, { useState } from "react";
import { Badge, Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Table } from "reactstrap";

const MOCK_TRANSACTIONS = [
  { id: 1, type: "Entrada", description: "Mensalidade - João Silva", amount: 350, method: "PIX", time: "08:15" },
  { id: 2, type: "Saída", description: "Compra de material", amount: -120, method: "Cartão", time: "10:05" },
  { id: 3, type: "Entrada", description: "Aula avulsa - Maria", amount: 80, method: "Dinheiro", time: "11:42" },
  { id: 4, type: "Saída", description: "Reembolso colaborador", amount: -45, method: "PIX", time: "13:20" },
];

const cashiers = [
  { id: "all", label: "Todos os caixas" },
  { id: "front", label: "Recepção" },
  { id: "pool", label: "Piscina" },
];

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

const CashRegisterPage = () => {
  const [selectedCashier, setSelectedCashier] = useState("all");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  return (
    <div className="mt-4">
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <CardTitle tag="h4" className="mb-1">
                Movimentações do caixa
              </CardTitle>
              <small className="text-muted">Revise lançamentos e registre ajustes rapidamente.</small>
            </div>
            <div className="d-flex gap-2">
              <Button color="primary" size="sm">
                Registrar entrada
              </Button>
              <Button color="danger" outline size="sm">
                Registrar saída
              </Button>
            </div>
          </div>

          <Form className="row g-3">
            <div className="col-md-3">
              <FormGroup>
                <Label for="cashierSelect">Caixa</Label>
                <Input
                  id="cashierSelect"
                  type="select"
                  value={selectedCashier}
                  onChange={(event) => setSelectedCashier(event.target.value)}
                >
                  {cashiers.map((cashier) => (
                    <option key={cashier.id} value={cashier.id}>
                      {cashier.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="dateFilter">Data</Label>
                <Input id="dateFilter" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </FormGroup>
            </div>
            <div className="col-md-6 d-flex align-items-end justify-content-end gap-2">
              <Button color="secondary" outline size="sm">
                Exportar PDF
              </Button>
              <Button color="secondary" outline size="sm">
                Exportar CSV
              </Button>
              <Button color="primary" size="sm">
                Atualizar dados
              </Button>
            </div>
          </Form>

          <div className="table-responsive mt-4">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Horário</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Forma</th>
                  <th className="text-end">Valor</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.time}</td>
                    <td>{transaction.description}</td>
                    <td>
                      <Badge color={transaction.amount > 0 ? "success" : "danger"} className="px-3">
                        {transaction.type}
                      </Badge>
                    </td>
                    <td>{transaction.method}</td>
                    <td className={`text-end fw-semibold ${transaction.amount > 0 ? "text-success" : "text-danger"}`}>
                      {formatCurrency(transaction.amount)}
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

export default CashRegisterPage;
