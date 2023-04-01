import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import FileUploadForm from './components/FileUploadForm';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <FileUploadForm />
    </div>
  );
};

export default App;