import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  PRODUCT_FIELDS,
  PRODUCT_FIELD_LABELS,
  PRODUCT_DEFAULT_VALUES,
} from "../../../constants/products";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../store/products/actions";
import { trimOrEmpty, numberOrZero } from "../../../utils/form";
import { usePhotoUpload } from "../../../hooks/usePhotoUpload";
import { useUniqueToast } from "../../../hooks/useUniqueToast";
import { useBusy } from "../../../hooks/useBusy";
import AvatarCell from "../../../components/shared/AvatarCell";
import PhotoInput from "../../../components/shared/PhotoInput";
import ConfirmDeleteModal from "../../../components/shared/ConfirmDeleteModal";

const resolveId = (item) => item?.id || item?.[PRODUCT_FIELDS.idProduct] || item?._id || null;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    creating,
    updating,
    deleting,
    created,
    updated,
    deletedId,
    error,
    createError,
    updateError,
    deleteError,
  } = useSelector((state) => state.products || {});

  const [formValues, setFormValues] = useState({ id: null, ...PRODUCT_DEFAULT_VALUES });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const photoUpload = usePhotoUpload("products");
  const { fire: fireCreated } = useUniqueToast();
  const { fire: fireUpdated } = useUniqueToast();
  const { fire: fireDeleted } = useUniqueToast();
  const isBusy = useBusy(creating, updating);
  const [saving, setSaving] = useState(false);

  const isButtonDisabled = saving || isBusy;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (photoUpload.previewUrl) {
      setFormValues((prev) => ({ ...prev, [PRODUCT_FIELDS.photoUrl]: photoUpload.previewUrl }));
    }
  }, [photoUpload.previewUrl]);

  useEffect(() => {
    const pid = resolveId(created);
    if (pid) {
      fireCreated(pid, () => toast.success("Produto criado com sucesso!"));
      resetForm();
      setSaving(false);
    }
  }, [created, fireCreated]);

  useEffect(() => {
    const pid = resolveId(updated);
    if (pid) {
      fireUpdated(pid, () => toast.success("Produto atualizado com sucesso!"));
      resetForm();
      setSaving(false);
    }
  }, [updated, fireUpdated]);

  useEffect(() => {
    if (deletedId) {
      fireDeleted(deletedId, () => toast.success("Produto excluído com sucesso!"));
    }
  }, [deletedId, fireDeleted]);

  useEffect(() => {
    const err = error || createError || updateError || deleteError;
    if (err) {
      toast.error(err);
    }
  }, [error, createError, updateError, deleteError]);

  const resetForm = () => {
    setFormValues({ id: null, ...PRODUCT_DEFAULT_VALUES });
    photoUpload.reset();
    setSaving(false);
  };

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      [PRODUCT_FIELDS.idProduct]: formValues[PRODUCT_FIELDS.idProduct] || undefined,
      [PRODUCT_FIELDS.name]: trimOrEmpty(formValues[PRODUCT_FIELDS.name]),
      [PRODUCT_FIELDS.description]: trimOrEmpty(formValues[PRODUCT_FIELDS.description]),
      [PRODUCT_FIELDS.photoUrl]: formValues[PRODUCT_FIELDS.photoUrl] || "",
      [PRODUCT_FIELDS.isActive]: Boolean(formValues[PRODUCT_FIELDS.isActive]),
      [PRODUCT_FIELDS.itemValue]: numberOrZero(formValues[PRODUCT_FIELDS.itemValue]),
      [PRODUCT_FIELDS.saleValue]: numberOrZero(formValues[PRODUCT_FIELDS.saleValue]),
      [PRODUCT_FIELDS.quantity]: numberOrZero(formValues[PRODUCT_FIELDS.quantity]) || 0,
    };

    try {
      if (photoUpload.file) {
        const uploadedUrl = await photoUpload.upload();
        payload[PRODUCT_FIELDS.photoUrl] = uploadedUrl || "";
      }

      const currentId = formValues.id;
      if (currentId) {
        dispatch(updateProduct(currentId, payload));
      } else {
        dispatch(createProduct(payload));
      }
    } catch (uploadErr) {
      setSaving(false);
      toast.error("Erro ao enviar a foto do produto");
    }
  };

  const handleEdit = useCallback((product) => {
    setFormValues({
      id: product.id,
      ...PRODUCT_DEFAULT_VALUES,
      ...product,
      [PRODUCT_FIELDS.idProduct]: product[PRODUCT_FIELDS.idProduct] || product.id,
    });
    photoUpload.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [photoUpload]);

  const openDeleteModal = (product) => {
    setDeleteTarget(product);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const confirmDelete = () => {
    const id = resolveId(deleteTarget);
    if (!id) {
      toast.error("Não foi possível identificar o produto para exclusão");
      return;
    }
    dispatch(deleteProduct(id));
    closeDeleteModal();
  };

  const tableRows = useMemo(() => {
    if (!products || products.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-4">
            Nenhum produto cadastrado
          </td>
        </tr>
      );
    }

    return products.map((product) => {
      const pid = resolveId(product);
      return (
        <tr key={pid || product.id}>
          <td>
            <AvatarCell src={product[PRODUCT_FIELDS.photoUrl]} alt={product[PRODUCT_FIELDS.name]} />
          </td>
          <td>
            <div className="fw-bold">{product[PRODUCT_FIELDS.name] || "-"}</div>
            <div className="text-muted small">
              {product[PRODUCT_FIELDS.description] || "Sem descrição"}
            </div>
          </td>
          <td>R$ {numberOrZero(product[PRODUCT_FIELDS.itemValue]).toFixed(2)}</td>
          <td>R$ {numberOrZero(product[PRODUCT_FIELDS.saleValue]).toFixed(2)}</td>
          <td>{numberOrZero(product[PRODUCT_FIELDS.quantity])}</td>
          <td>
            <span className={`badge ${product[PRODUCT_FIELDS.isActive] ? 'bg-success' : 'bg-danger'}`}>
              {product[PRODUCT_FIELDS.isActive] ? 'Ativo' : 'Inativo'}
            </span>
          </td>
          <td className="text-end">
            <Button
              color="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => handleEdit(product)}
            >
              <i className="fas fa-edit" />
            </Button>
            <Button
              color="outline-danger"
              size="sm"
              onClick={() => openDeleteModal(product)}
            >
              <i className="fas fa-trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }, [products]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">
                {formValues.id ? "Editar Produto" : "Novo Produto"}
              </h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="productName">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.name]}</Label>
                      <Input
                        id="productName"
                        type="text"
                        value={formValues[PRODUCT_FIELDS.name]}
                        onChange={(e) => handleChange(PRODUCT_FIELDS.name, e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <PhotoInput
                      id="productPhoto"
                      label={PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.photoUrl]}
                      onSelect={photoUpload.onSelectFile}
                      previewUrl={photoUpload.previewUrl || formValues[PRODUCT_FIELDS.photoUrl]}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label htmlFor="productDescription">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.description]}</Label>
                      <Input
                        id="productDescription"
                        type="textarea"
                        rows="3"
                        value={formValues[PRODUCT_FIELDS.description]}
                        onChange={(e) => handleChange(PRODUCT_FIELDS.description, e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="productItemValue">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.itemValue]}</Label>
                      <Input
                        id="productItemValue"
                        type="number"
                        step="0.01"
                        value={formValues[PRODUCT_FIELDS.itemValue]}
                        onChange={(e) => handleChange(PRODUCT_FIELDS.itemValue, e.target.value)}
                        min="0"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="productSaleValue">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.saleValue]}</Label>
                      <Input
                        id="productSaleValue"
                        type="number"
                        step="0.01"
                        value={formValues[PRODUCT_FIELDS.saleValue]}
                        onChange={(e) => handleChange(PRODUCT_FIELDS.saleValue, e.target.value)}
                        min="0"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="productIsActive">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.isActive]}</Label>
                      <div className="form-check">
                        <Input
                          id="productIsActive"
                          type="checkbox"
                          checked={formValues[PRODUCT_FIELDS.isActive]}
                          onChange={(e) => handleChange(PRODUCT_FIELDS.isActive, e.target.checked)}
                        />
                        <Label for="productIsActive" className="form-check-label">
                          Produto ativo
                        </Label>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="productQuantity">{PRODUCT_FIELD_LABELS[PRODUCT_FIELDS.quantity]}</Label>
                      <Input
                        id="productQuantity"
                        type="number"
                        value={formValues[PRODUCT_FIELDS.quantity]}
                        onChange={(e) => handleChange(PRODUCT_FIELDS.quantity, e.target.value)}
                        min="0"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="d-flex align-items-center mt-3">
                  <Button color="primary" type="submit" disabled={isButtonDisabled}>
                    {saving || isBusy ? "Salvando..." : formValues.id ? "Atualizar Produto" : "Criar Produto"}
                  </Button>
                  {formValues.id && (
                    <Button color="secondary" type="button" className="ms-2" onClick={resetForm}>
                      Cancelar edição
                    </Button>
                  )}
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">Produtos</h4>
                <Button color="success" onClick={resetForm}>
                  Novo Produto
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <i className="fas fa-spinner fa-spin fa-2x" />
                  <p className="mt-2">Carregando produtos...</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Foto</th>
                        <th>Produto</th>
                        <th>Valor de Compra</th>
                        <th>Valor de Venda</th>
                        <th>Quantidade</th>
                        <th>Status</th>
                        <th className="text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        toggle={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleting}
        itemName={deleteTarget?.[PRODUCT_FIELDS.name] || "este produto"}
      />
    </React.Fragment>
  );
};

export default ProductsPage;
