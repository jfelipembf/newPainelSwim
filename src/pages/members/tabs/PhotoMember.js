import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';

const PhotoMember = ({ onPhotoChange, currentPhotoUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentPhotoUrl || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Keep preview in sync when an existing photo url is provided
    if (currentPhotoUrl && !selectedFile) {
      setPreview(currentPhotoUrl);
    }
  }, [currentPhotoUrl, selectedFile]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        setPreview(url);
        if (onPhotoChange) {
          onPhotoChange(file, url);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onPhotoChange) {
      onPhotoChange(null, '');
    }
  };

  return (
    <div>
      <h5 className="mb-4">Foto do Cliente</h5>

      <Row>
        <Col md={8}>
          <Card>
            <CardBody>
              <div className="text-center">
                {preview ? (
                  <div className="mb-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: '300px', maxWidth: '300px' }}
                    />
                  </div>
                ) : (
                  <div
                    className="border border-dashed p-4 mb-3"
                    style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div className="text-muted">
                      <i className="fas fa-camera fa-3x mb-3"></i>
                      <p>Nenhuma foto selecionada</p>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-center gap-2">
                  <Button
                    color="primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fas fa-folder-open"></i> Selecionar Foto
                  </Button>

                  {selectedFile && (
                    <Button
                      color="danger"
                      onClick={removePhoto}
                    >
                      <i className="fas fa-trash"></i> Remover
                    </Button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardBody>
              <h6>Informações da Foto</h6>

              {selectedFile ? (
                <div>
                  <p><strong>Nome:</strong> {selectedFile.name}</p>
                  <p><strong>Tamanho:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                  <p><strong>Tipo:</strong> {selectedFile.type}</p>
                </div>
              ) : (
                <p className="text-muted">Nenhuma foto selecionada</p>
              )}

            </CardBody>
          </Card>

          <Card className="mt-3">
            <CardBody>
              <h6>Dicas</h6>
              <ul className="list-unstyled">
                <li><i className="fas fa-check text-success"></i> Use fotos de boa qualidade</li>
                <li><i className="fas fa-check text-success"></i> Formatos aceitos: JPG, PNG</li>
                <li><i className="fas fa-check text-success"></i> Tamanho máximo: 5MB</li>
                <li><i className="fas fa-check text-success"></i> Fundo neutro recomendado</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PhotoMember;
