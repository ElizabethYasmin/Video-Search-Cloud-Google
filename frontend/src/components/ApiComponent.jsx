import React, { useState } from 'react';

const ApiComponent = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:8000/videos/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log('Video uploaded:', data))
      .catch(error => console.error('Error uploading video:', error));
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default ApiComponent;
