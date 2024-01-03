import React, { useState } from 'react';
import ApiComponent from './components/ApiComponent';
import FilteredVideoList from './components/FilteredVideoList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearch = (query) => {
    // Realizar la llamada al backend con la búsqueda
    fetch(`http://127.0.0.1:8000/videos/filter/${query}`)
      .then(response => response.json())
      .then(data => setFilteredVideos(data))
      .catch(error => console.error('Error fetching filtered videos:', error));
  };

  return (
    <div>
      <ApiComponent />
      <div>
        <input
          type="text"
          placeholder="Buscar videos por etiqueta..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => handleSearch(searchQuery)}>Buscar</button>
      </div>
      {filteredVideos.length > 0 && <FilteredVideoList videos={filteredVideos} />}
    </div>
  );
};

export default App;
