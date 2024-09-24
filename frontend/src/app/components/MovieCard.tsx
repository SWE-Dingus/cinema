import React from "react";

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
      {/* Movie Poster */}
      <img src={movie.poster} alt={movie.title} className="w-full" />

      {/* Movie Title */}
      <h3 className="mt-2 text-xl">{movie.title}</h3>

      {/* Embed YouTube Trailer */}
      <div className="mt-2">
        <iframe
          width="100%"
          height="200"
          src={movie.trailer}
          title={`${movie.title} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieCard;
