import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { Button, Modal } from 'react-bootstrap';

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState('http://192.168.1.201:4000/file/upload');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !uploadUrl) {
      setModalMessage('Please select a file and enter the URL to upload to.');
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(`File uploaded successfully: ${data.fileUrl}`);
      } else {
        setModalMessage('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('An error occurred while uploading the file.');
    } finally {
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-5">
      {/* <h1 className="text-center mb-4">Upload a File</h1> */}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="uploadUrl">Upload URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uploadUrl"
                    value={uploadUrl}
                    onChange={handleUrlChange}
                  />
                </div>
                <FileUpload onFileSelected={handleFileSelected} />
                <Button type="submit" variant="primary" className="btn-block mt-3">
                  Upload
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>File Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FileUploadForm;
