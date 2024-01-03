import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; // Importa la librería de modales

// ... (imports y otros códigos)

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
      })
      .finally(() => {
        // Limpiar el campo de examinar después de cargar un video
        setFile(null);
      });
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          style={{
            padding: '5px 10px', // Ajusta el padding para que sea más pequeño
            fontSize: '14px',    // Ajusta el tamaño de la fuente
          }}
        >
          Upload
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApiComponent;
