import React, { useState } from 'react';
import FileUpload from './FileUpload';

const FileUploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadUrl, setUploadUrl] = useState('http://192.168.1.201:4000/file/upload');

    const handleFileSelected = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file || !uploadUrl) {
            alert('Please select a file and enter the URL to upload to.');
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
                alert(`File uploaded successfully: ${data.fileUrl}`);
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error)
            alert('An error occurred while uploading the file');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FileUpload onFileSelected={handleFileSelected} />
            <div className="mb-3">
                <label htmlFor="uploadUrl" className="form-label">
                    Upload URL
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="uploadUrl"
                    value={uploadUrl}
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Upload
            </button>
        </form>
    );
};

export default FileUploadForm;
