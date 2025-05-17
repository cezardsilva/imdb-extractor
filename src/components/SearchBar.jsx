import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [imdbId, setImdbId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imdbId.trim()) {
      onSearch(imdbId.trim());
    }
  };

  return (
    <div className="search-container">
      <h1>IMDb Data Extractor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Digite o ID do IMDb (ex: tt0944947)"
        />
        <button type="submit">Buscar Dados</button>
      </form>
    </div>
  );
}
