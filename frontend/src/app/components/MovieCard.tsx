import React from 'react';

interface MovieCardProps {
  movie: {
    title: string;
    poster: string;
    trailer: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="border p-2">
      <img src={movie.poster} alt={movie.title} />
      <h3 className="mt-2">{movie.title}</h3>
      <button
        className="mt-2 bg-blue-500 text-white px-3 py-1"
        onClick={() => window.open(movie.trailer, '_blank')}
      >
        Watch Trailer
      </button>
    </div>
  );
};

export default MovieCard;
