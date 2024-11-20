import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/app/models/Movie";
import Image from "next/image";
import infoIcon from "@/app/images/info.png"; // Adjust path if necessary

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [positionClass, setPositionClass] = useState("origin-center"); // Default to center
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

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

  const handleInfoClick = () => {
    router.push(`/movie?id=${movie.id}`);
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

      {/* Movie Title and Rating (conditionally rendered on hover) */}
      {isHovered && (
        <div className="text-center mb-3">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400"> Rating: {movie.ageRating}</p>
        </div>
      )}

      {/* Buttons (conditionally rendered on hover) */}
      {isHovered && (
        <div className="flex space-x-2 mt-3 justify-center">
          {movie.isRunning && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
              Book Tickets
            </button>
          )}
          <button
            onClick={handleInfoClick}
            className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded flex items-center"
          >
            <Image src={infoIcon} alt="Info" className="w-4 h-4 mr-1" /> Info
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
