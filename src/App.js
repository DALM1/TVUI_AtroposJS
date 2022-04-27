import { useState, useEffect } from "react";
import Atropos from "atropos/react";
import "./App.css";

const ranges = [
  { start: 1987, end: 1999 },
  { start: 2000, end: 2009 },
  { start: 2010, end: 2021 },
];

function App() {
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    const res = await fetch("trek_movies.json");
    const resJSON = await res.json();
    setMovies(resJSON.movies);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderRange = (movies, start, end) => {
    return (
      <div className="row">
        <h2>
          {start}-{end}
        </h2>
        <div className="movie-list">
          {movies
            .filter((m) => m.Year >= start && m.Year <= end)
            .sort((m1, m2) => parseInt(m1.Year) - parseInt(m2.Year))
            .map(renderMovie)}
        </div>
      </div>
    );
  };

  const renderMovie = (m) => {
    return (
      <Atropos key={m.Title} className="atropos">
        <img
          className="poster-image"
          src={m.Poster}
          alt={m.Title}
          data-atropos-offset="-3"
        />
      </Atropos>
    );
  };

  return (
    <div id="app">
      <h1>Star Strek Movies &amp; Show</h1>
      {ranges.map((range) => {
        return renderRange(movies, range.start, range.end);
      })}
    </div>
  );
}

export default App;
