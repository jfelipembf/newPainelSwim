import React, { useMemo, useState } from "react";
import { Badge, Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Table } from "reactstrap";

const MOCK_BILLS = [
  { id: 1, supplier: "Fornecedora Atlântida", category: "Infraestrutura", amount: 2150, dueDate: "2024-12-05", status: "pending" },
  { id: 2, supplier: "Consumo Elétrico", category: "Utilidades", amount: 1420, dueDate: "2024-12-03", status: "overdue" },
  { id: 3, supplier: "Equipe Instrutores", category: "Folha", amount: 9800, dueDate: "2024-12-10", status: "scheduled" },
  { id: 4, supplier: "Agência Digital", category: "Marketing", amount: 2400, dueDate: "2024-12-18", status: "pending" },
];

const STATUS_LABELS = {
  pending: { label: "Pendente", color: "warning" },
  overdue: { label: "Em atraso", color: "danger" },
  paid: { label: "Pago", color: "success" },
  scheduled: { label: "Agendado", color: "info" },
};

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

const AccountsPayablePage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dueDateStart, setDueDateStart] = useState(() => new Date().toISOString().split("T")[0]);

  const filteredBills = useMemo(() => {
    return MOCK_BILLS.filter((bill) => {
      const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
      const matchesSearch = bill.supplier.toLowerCase().includes(search.toLowerCase());
      const matchesDate = !dueDateStart || bill.dueDate >= dueDateStart;
      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [statusFilter, search, dueDateStart]);

  return (
    <div className="mt-4">
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <CardTitle tag="h4" className="mb-1">
                Contas a pagar
              </CardTitle>
              <small className="text-muted">Organize compromissos por fornecedor, categoria e status.</small>
            </div>
            <div className="d-flex gap-2">
              <Button color="primary" size="sm">
                Nova despesa
              </Button>
              <Button color="secondary" outline size="sm">
                Importar planilha
              </Button>
            </div>
          </div>

          <Form className="row g-3 mb-4">
            <div className="col-md-3">
              <FormGroup>
                <Label for="statusFilter">Status</Label>
                <Input id="statusFilter" type="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Todos</option>
                  <option value="pending">Pendente</option>
                  <option value="scheduled">Agendado</option>
                  <option value="overdue">Em atraso</option>
                  <option value="paid">Pago</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="dueDateStart">Vencimento a partir de</Label>
                <Input id="dueDateStart" type="date" value={dueDateStart} onChange={(e) => setDueDateStart(e.target.value)} />
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label for="searchSupplier">Fornecedor</Label>
                <Input
                  id="searchSupplier"
                  type="search"
                  placeholder="Ex.: Fornecedora Atlântida"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="col-md-2 d-flex align-items-end justify-content-end gap-2">
              <Button color="light" size="sm" onClick={() => {
                setStatusFilter("all");
                setSearch("");
                setDueDateStart("");
              }}>
                Limpar
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
                  <th>Fornecedor</th>
                  <th>Categoria</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th className="text-end">Valor</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.supplier}</td>
                    <td>{bill.category}</td>
                    <td>{new Date(bill.dueDate).toLocaleDateString("pt-BR")}</td>
                    <td>
                      <Badge color={STATUS_LABELS[bill.status]?.color || "secondary"} className="px-3">
                        {STATUS_LABELS[bill.status]?.label || bill.status}
                      </Badge>
                    </td>
                    <td className="text-end fw-semibold">{formatCurrency(bill.amount)}</td>
                    <td className="text-end">
                      <Button color="link" size="sm" className="text-decoration-none">
                        Detalhes
                      </Button>
                      <Button color="success" size="sm">
                        Pagar
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

export default AccountsPayablePage;
