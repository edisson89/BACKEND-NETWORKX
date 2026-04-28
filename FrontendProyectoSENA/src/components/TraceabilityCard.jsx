import '../traceabilitysearch.css'
import React, { useState } from 'react';

const TraceabilitySearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-module" onSubmit={handleSubmit}>
      <label htmlFor="search-input">Buscar en la cadena comercial:</label>
      <div className="input-group">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ej: Productores directos de café..."
          aria-label="Buscar productores"
        />
        <button type="submit" className="btn-search">
          Validar Origen
        </button>
      </div>
      <small>Filtrando por: **Transformación Digital Directa**</small>
    </form>
  );
};

export default TraceabilitySearch;