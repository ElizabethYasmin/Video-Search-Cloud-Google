import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApiComponent = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      // Mostrar un toast de error si no se selecciona un archivo
      toast.error('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:8000/videos/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Video uploaded:', data);
        // Mostrar un toast de éxito
        toast.success('¡Video subido correctamente!');
      })
      .catch(error => {
        console.error('Error uploading video:', error);
        // Mostrar un toast de error en caso de fallo
        toast.error('Error al subir el video. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApiComponent;
