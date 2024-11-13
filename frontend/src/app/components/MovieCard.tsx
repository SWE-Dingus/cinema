import React, { useState, useRef, useEffect } from "react";
import { Movie } from "@/app/models/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [positionClass, setPositionClass] = useState("origin-center"); // Default to center
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Determine initial position of the card on mount
  useEffect(() => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      if (cardRect.left < 100) {
        setPositionClass("origin-left"); // Expand from the left
      } else if (windowWidth - cardRect.right < 100) {
        setPositionClass("origin-right"); // Expand from the right
      } else {
        setPositionClass("origin-center"); // Expand from the center
      }
    }
  }, []); // Runs only once after the component mounts

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true); // Trigger expansion after 0.5 seconds
      setShowTrailer(true); // Show trailer after delay
    }, 500); // Half-second delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsHovered(false);
    setShowTrailer(false); // Revert back to poster
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-56 flex-shrink-0 p-2 rounded-lg text-white transition-transform duration-300 ease-in-out ${
        isHovered
          ? `absolute z-50 w-96 transform scale-125 ${positionClass} top-0 -mt-20 bg-gray-900 border border-gray-700`
          : "bg-gray-900 border border-gray-700"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conditionally render poster or trailer */}
      {!showTrailer ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className={`w-full ${
            isHovered ? "h-96" : "h-72"
          } object-cover rounded transition-all duration-300`}
        />
      ) : (
        <iframe
          width="100%"
          height="300"
          src={`https://youtube.com/embed/${movie.trailerId}?autoplay=1&mute=1`}
          title={`${movie.title} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
        ></iframe>
      )}

      {/* Book Tickets Button (conditionally rendered on hover) */}
      {movie.isRunning && isHovered && (
        <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
          Book Tickets
        </button>
      )}
    </div>
  );
};

export default MovieCard;
