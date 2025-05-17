import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbIdFromUrl = urlParams.get("id");

    if (imdbIdFromUrl) {
      fetchData(imdbIdFromUrl);
    }
  }, []);

  async function fetchData(imdbId) {
    setLoading(true);
    setError(null);
    setMovie(null);

    try {
      const query = `
        query titleById($id: ID!) {
          title(id: $id) {
            id
            type
            is_adult
            primary_title
            original_title
            start_year
            end_year
            runtime_minutes
            plot
            rating {
              aggregate_rating
              votes_count
            }
            genres
            posters {
              url
              width
              height
            }
            certificates {
              country {
                code
                name
              }
              rating
            }
            spoken_languages {
              code
              name
            }
            origin_countries {
              code
              name
            }
            directors: credits(first: 5, categories: ["director"]) {
              name {
                id
                display_name
                avatars {
                  url
                  width
                  height
                }
              }
            }
            casts: credits(first: 5, categories: ["actor", "actress"]) {
              name {
                id
                display_name
                avatars {
                  url
                  width
                  height
                }
              }
              characters
            }
          }
        }
      `;

      const variables = { id: imdbId };

      const response = await fetch("https://graph.imdbapi.dev/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data?.title) {
        setMovie(data.data.title);
      } else {
        throw new Error("Dados do filme não encontrados");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <SearchBar onSearch={fetchData} />

      {loading && <div className="loading">Carregando dados...</div>}

      {error && <div className="error">Erro: {error}</div>}

      {movie && <MovieCard movie={movie} />}
    </div>
  );
}
