// FilteredVideoList.jsx

import React from 'react';

const FilteredVideoList = ({ videos }) => {
  return (
    <div>
      <h2>Resultados de la búsqueda</h2>
      <ul>
        {videos.map(video => (
          <li key={video.name}>
            <h3>{video.name}</h3>
            <p>Etiqueta: {video.etiqueta}</p>
            <p>Nombre: {video.name}</p>


            <video width="320" height="240" controls>
              {/* Corregimos la URL del video */}
              <source src={`https://${video.url_video}`} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>

            <img src={`https://${video.url_gif}`} alt="GIF" />

            
            <img  src={`https://${video.url_image}`} alt="Thumbnail" />

            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredVideoList;
