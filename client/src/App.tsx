import React from 'react';
import FileUploadForm from './components/FileUploadForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">File Transfer App</h1>
      <FileUploadForm />
    </div>
  );
};

export default App;