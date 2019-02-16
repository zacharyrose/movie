import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard(props) {
  const {
    id,
    title,
    releaseDate,
    imdbId,
    poster,
  } = props;

  return (
    <div className="movie-card">
      <Link to={`/${id}`}>
        <div className="movie-poster">
          <img src={poster} />
        </div>
        <div className="movie-title">
          {title}
        </div>
      </Link>
    </div>
  );
}
