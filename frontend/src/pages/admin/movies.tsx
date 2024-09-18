import React, { useState } from 'react';

interface Movie {
  title: string;
  category: string;
  showtimes: string[];
}

const ManageMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState<string>('');
  const [newMovieCategory, setNewMovieCategory] = useState<string>('');
  const [newShowtime, setNewShowtime] = useState<string>('');
  const [showtimes, setShowtimes] = useState<string[]>([]);

  const addMovie = () => {
    const newMovie: Movie = {
      title: newMovieTitle,
      category: newMovieCategory,
      showtimes: showtimes,
    };
    setMovies([...movies, newMovie]);
    setNewMovieTitle('');
    setNewMovieCategory('');
    setShowtimes([]);
  };

  const deleteMovie = (index: number) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const addShowtime = () => {
    setShowtimes([...showtimes, newShowtime]);
    setNewShowtime('');
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Movies</h1>

      <div>
        <input
          type="text"
          placeholder="Enter movie title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Enter movie category"
          value={newMovieCategory}
          onChange={(e) => setNewMovieCategory(e.target.value)}
          className="border p-2 mr-2"
        />
        <div>
          <input
            type="text"
            placeholder="Add showtime"
            value={newShowtime}
            onChange={(e) => setNewShowtime(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={addShowtime} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Showtime
          </button>
        </div>
        <div>
          <button onClick={addMovie} className="bg-green-500 text-white px-4 py-2 rounded mt-3">
            Add Movie
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Existing Movies</h2>
        <ul>
          {movies.map((movie, index) => (
            <li key={index} className="mb-2">
              <strong>{movie.title}</strong> - {movie.category}
              <button
                onClick={() => deleteMovie(index)}
                className="ml-4 text-red-500"
              >
                Delete
              </button>
              <div>Showtimes: {movie.showtimes.join(', ')}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageMovies;
