import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=13e3265a";

// const movie1 = {
//   Title: "Italian Spiderman",
//   Year: "2007",
//   imdbID: "tt2705436",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchterm, setsearchterm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setmovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Batman");
  }, []);
  return (
    <>
      <div className="app">
        <h1>Movie Seacrh</h1>
        <div className="search">
          <input
            placeholder="Search for any movie"
            value={searchterm}
            onChange={(e) => setsearchterm(e.target.value)}
          />
          <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchterm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
