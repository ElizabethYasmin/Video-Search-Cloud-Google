import React, { useState, useEffect } from 'react';

const FilteredVideoList = () => {
  const [query, setQuery] = useState('');  // Estado para almacenar el término de búsqueda
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Realizar la solicitud para obtener la lista de videos filtrada desde tu backend
    fetch(`http://127.0.0.1:8000/videos/filter/${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => setFilteredVideos(data))
      .catch(error => console.error('Error fetching filtered videos:', error));
  };

  useEffect(() => {
    // Puedes realizar la solicitud al cargar el componente o cuando sea necesario
    handleSearch();
  }, []);  // Dependencia vacía para que se ejecute solo una vez al montar el componente

  return (
    <div>
      <h2>Lista de Videos Filtrada</h2>
      <div>
        <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <ul>
        {filteredVideos.map(video => (
          <li key={video.id}>{video.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredVideoList;
