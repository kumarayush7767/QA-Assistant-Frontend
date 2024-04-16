import React, { useState } from 'react';
import axios from 'axios';
import './FileUploadPage.css'; // Import CSS file

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Call the delete API to delete all files from the data folder in backend
      await axios.delete('http://localhost:5000/delete');

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        window.location.href = '/question-answer';
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">QA Assistant</h1>
      <input type="file" onChange={handleFileChange} className="input" />
      <button onClick={handleUpload} disabled={!file || uploading} className="button">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUploadPage;
