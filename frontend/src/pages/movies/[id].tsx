import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../app/components/Navbar";
import Image from "next/image";
import Config from "../../../frontend.config";
import { Movie } from "@/app/models/Movie";

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/get/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]); // Now `id` is the only dependency

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <div className="flex">
          <Image src={movie.posterUrl} alt={movie.title} className="w-1/3" />
          <div className="ml-5">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p>
              TODO Movie duration here | {movie.ageRating} | TODO Movie release
              date here
            </p>
            <p className="mt-4">{movie.synopsis}</p>

            <div className="mt-5">
              <h3 className="text-2xl font-bold mb-2">Watch Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src={`https://youtube.com/embed/${movie.trailerId}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

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
