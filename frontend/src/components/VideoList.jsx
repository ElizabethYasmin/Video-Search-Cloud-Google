// Archivo src/components/VideoList.jsx

import React, { useState, useEffect } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Realizar la solicitud para obtener la lista de videos desde tu backend
    const apiUrl = 'http://127.0.0.1:8000/videos/list';
    console.log('Fetching data from:', apiUrl);  // Imprime la URL en la consola
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Puedes incluir otros encabezados según sea necesario
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Imprimir la respuesta en la consola
        // Verifica la estructura exacta de la respuesta y ajusta esta línea en consecuencia
        setVideos([data]);
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);  // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente
  
  return (
    <div>
      <h2>Lista de Videos</h2>
      <ul>
        <li key={videos.id}>{videos.name}</li>
      </ul>
    </div>
  );
};

export default VideoList;
