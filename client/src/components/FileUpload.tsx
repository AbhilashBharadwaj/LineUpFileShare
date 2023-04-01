import React, { ChangeEvent } from 'react';

interface FileUploadProps {
    onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileSelected(event.target.files[0]);
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="fileUpload" className="form-label">
                Choose a file to upload
            </label>
            <input
                type="file"
                className="form-control"
                id="fileUpload"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUpload;
