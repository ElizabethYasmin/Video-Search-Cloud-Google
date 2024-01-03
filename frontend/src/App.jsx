import React, { useState, useEffect } from 'react';
import ApiComponent from './components/ApiComponent';
import FilteredVideoList from './components/FilteredVideoList';
import './App.css'; // Importa el archivo de estilos CSS
import './FilteredVideoList.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  useEffect(() => {
    // Realizar una búsqueda al cargar la página
    handleSearch();
  }, []); // Dependencia vacía para ejecutar una vez al montar el componente

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);

    // Convertir la primera letra a mayúscula y el resto a minúsculas
    const formattedSearchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();

    fetch(`http://127.0.0.1:8000/videos/filter/${formattedSearchQuery}`)
      .then(response => response.json())
      .then(data => {
        setFilteredVideos(data);
        // Almacena la búsqueda reciente
        setRecentSearches(prevSearches => [{ query: formattedSearchQuery, videos: data }, ...prevSearches.slice(0, 4)]);
      })
      .catch(error => console.error('Error fetching filtered videos:', error))
      .finally(() => setIsLoading(false));
  };

  const handleRecentSearchClick = (recentSearch) => {
    // Actualizar la búsqueda reciente en función del historial
    setSearchQuery(recentSearch.query);
    setFilteredVideos(recentSearch.videos);
    // Establecer la sugerencia seleccionada
    setSelectedSuggestion(recentSearch.query);
  };

  const handleSuggestionClick = () => {
    // Realizar la búsqueda cuando se hace clic en una sugerencia
    setSearchQuery(selectedSuggestion);
    handleSearch();
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Recientes</h2>
        <ul>
          {recentSearches.map((recentSearch, index) => (
            <li key={index} onClick={() => handleRecentSearchClick(recentSearch)}>
              {recentSearch.query}
              {recentSearch.videos.length > 0 && (
                <div className="thumbnail-container">
                  {recentSearch.videos.map((video, vidIndex) => (
                    <img key={vidIndex} src={`https://${video.url_image}`} alt={`Thumbnail ${video.name}`} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        <ApiComponent />
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar videos por etiqueta..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Limpiar la sugerencia seleccionada al escribir
              setSelectedSuggestion('');
            }}
            list="suggestions"
          />
          <datalist id="suggestions">
            {recentSearches.map((recentSearch, index) => (
              <option key={index} value={recentSearch.query} />
            ))}
          </datalist>
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
          {selectedSuggestion && (
            <button onClick={handleSuggestionClick}>
              Buscar sugerencia: {selectedSuggestion}
            </button>
          )}
        </div>

        {isLoading && <p>Realizando búsqueda...</p>}
        {filteredVideos.length > 0 && <FilteredVideoList videos={filteredVideos} />}
        {filteredVideos.length === 0 && !isLoading && <p>No se encontraron videos.</p>}
      </div>
    </div>
  );
};

export default App;
