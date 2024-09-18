"use client";
import React, { useState } from 'react';
import Navbar from '../app/components/Navbar';
import SearchBar from '../app/components/SearchBar';
import MovieCard from '../app/components/MovieCard';


interface Movie {
  id: number;
  title: string;
  category: string;
  poster: string;
  trailer: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Never Let Go',
    category: 'Coming Soon',
    poster: 'https://via.placeholder.com/150',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Beetlejuice',
    category: 'Currently Running',
    poster: 'https://via.placeholder.com/150',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="p-5">
        <h2 className="text-2xl font-bold">Currently Running</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => movie.category === 'Currently Running')
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>

      <section className="p-5">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => movie.category === 'Coming Soon')
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
