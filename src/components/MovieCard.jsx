import Rating from "./Rating";
import PersonCard from "./PersonCard";

export default function MovieCard({ movie }) {
  const certificate =
    movie.certificates?.find((c) => c.country.code === "US") ||
    movie.certificates?.[0];

  return (
    <div className="movie-container">
      <div className="movie-header">
        <div className="movie-poster">
          <img
            src={
              movie.posters?.[0]?.url ||
              "https://via.placeholder.com/300x450?text=Poster+Não+Disponível"
            }
            alt={`Poster de ${movie.primary_title}`}
          />
        </div>

        <div className="movie-info">
          <h2>{movie.primary_title}</h2>
          {movie.original_title !== movie.primary_title && (
            <h3>{movie.original_title}</h3>
          )}

          <Rating
            value={movie.rating?.aggregate_rating}
            count={movie.rating?.votes_count}
          />

          <div className="movie-meta">
            <p>
              <strong>Tipo:</strong> {movie.type}
            </p>
            <p>
              <strong>Ano:</strong> {movie.start_year}
              {movie.end_year ? `-${movie.end_year}` : ""}
            </p>
            <p>
              <strong>Duração:</strong> {movie.runtime_minutes || "N/A"} minutos
            </p>
            <p>
              <strong>Gêneros:</strong> {movie.genres?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Países:</strong>{" "}
              {movie.origin_countries?.map((c) => c.name).join(", ") || "N/A"}
            </p>
            <p>
              <strong>Idiomas:</strong>{" "}
              {movie.spoken_languages?.map((l) => l.name).join(", ") || "N/A"}
            </p>
            <p>
              <strong>Classificação:</strong>{" "}
              {certificate
                ? `${certificate.rating} (${certificate.country.name})`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="movie-section">
        <h4>Sinopse</h4>
        <p>{movie.plot || "Sinopse não disponível."}</p>
      </div>

      {movie.directors?.length > 0 && (
        <div className="movie-section">
          <h4>Direção</h4>
          <div className="credits-grid">
            {movie.directors.map((dir, index) => (
              <PersonCard key={index} person={dir.name} />
            ))}
          </div>
        </div>
      )}

      {movie.casts?.length > 0 && (
        <div className="movie-section">
          <h4>Elenco Principal</h4>
          <div className="credits-grid">
            {movie.casts.map((actor, index) => (
              <PersonCard
                key={index}
                person={actor.name}
                character={actor.characters?.[0]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
