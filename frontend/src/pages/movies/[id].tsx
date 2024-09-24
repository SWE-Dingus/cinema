import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import Navbar from '../../app/components/Navbar'; // Adjust path based on your folder structure
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  synopsis: string;
  posterUrl: string;
  trailerUrl: string;
  releaseDate: string;
  duration: string;
  ageRating: string;
  category: string[];
}

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { id } = router.query; // Get the movie id from the URL

  useEffect(() => {
    if (id) {
      fetchMovieDetails(); // Call the function here
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/get/${id}`); // Replace with your actual endpoint
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar /> {/* Keep the navbar at the top */}
      
      <div className="p-5">
        {/* Movie Poster and Title */}
        <div className="flex">
          <Image 
          src={movie.posterUrl} 
          alt={movie.title} 
          width={300} 
          height={450} 
          className="w-1/3" 
          />
          <div className="ml-5">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p>{movie.duration} | {movie.ageRating} | {movie.releaseDate}</p>
            <p className="mt-4">{movie.synopsis}</p>

            {/* Play Trailer Button */}
            <div className="mt-5">
              <h3 className="text-2xl font-bold mb-2">Watch Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src={movie.trailerUrl}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Buttons to Book Tickets or Go Back */}
            <div className="mt-5">
              <Link href={`/movies/${movie.id}/showtimes`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded mr-4">
                  Book Tickets
                </button>
              </Link>

              <Link href="/">
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                  Back to Main
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
