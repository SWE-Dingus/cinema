import React, { useState, useEffect } from 'react';

interface Movie {
  id?: number; // Include ID for backend reference
  title: string;
  ageRating: string;
  reviewRating: number;
  cast: string[];
  director: string;
  synopsis: string;
  category: string[];
  childPrice: number;
  adultPrice: number;
  seniorPrice: number;
  onlineFee: number;
  posterUrl: string;
  trailerUrl: string;
  isRunning: boolean;
}

const ManageMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState<string>('');
  const [newMovieAgeRating, setNewMovieAgeRating] = useState<string>('G');
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newCast, setNewCast] = useState<string[]>([]);
  const [newDirector, setNewDirector] = useState<string>('');
  const [newSynopsis, setNewSynopsis] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string[]>([]);
  const [newChildPrice, setNewChildPrice] = useState<number>(0);
  const [newAdultPrice, setNewAdultPrice] = useState<number>(0);
  const [newSeniorPrice, setNewSeniorPrice] = useState<number>(0);
  const [newOnlineFee, setNewOnlineFee] = useState<number>(0);
  const [newPosterUrl, setNewPosterUrl] = useState<string>('');
  const [newTrailerUrl, setNewTrailerUrl] = useState<string>('');
  const [newIsRunning, setNewIsRunning] = useState<boolean>(false);
  const [newCastMember, setNewCastMember] = useState<string>('');
  const [newCategoryInput, setNewCategoryInput] = useState<string>('');

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/movies/getAll');
      const data = await response.json();
      
      const initializedMovies = data.map((movie: Movie) => ({
        ...movie,
        category: movie.category || [],
        cast: movie.cast || [],
      }));
      
      setMovies(initializedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const addMovie = async () => {
    const newMovie: Movie = {
      title: newMovieTitle,
      ageRating: newMovieAgeRating,
      reviewRating: newReviewRating,
      cast: newCast,
      director: newDirector,
      synopsis: newSynopsis,
      category: newCategory,
      childPrice: newChildPrice,
      adultPrice: newAdultPrice,
      seniorPrice: newSeniorPrice,
      onlineFee: newOnlineFee,
      posterUrl: newPosterUrl,
      trailerUrl: newTrailerUrl,
      isRunning: newIsRunning,
    };

    console.log("Sending the following data:", newMovie);

    try {
      const response = await fetch('http://localhost:8080/api/movies/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie');
      }

      const savedMovie = await response.json();
      setMovies((prevMovies) => [...prevMovies, savedMovie]); // Update the list with the new movie
      resetMovieFields();
      
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const deleteMovie = async (movieId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/delete/${movieId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }

      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const resetMovieFields = () => {
    setNewMovieTitle('');
    setNewMovieAgeRating('G');
    setNewReviewRating(0);
    setNewCast([]);
    setNewDirector('');
    setNewSynopsis('');
    setNewCategory([]);
    setNewChildPrice(0);
    setNewAdultPrice(0);
    setNewSeniorPrice(0);
    setNewOnlineFee(0);
    setNewPosterUrl('');
    setNewTrailerUrl('');
    setNewIsRunning(false);
  };

  const addCastMember = () => {
    setNewCast([...newCast, newCastMember]);
    setNewCastMember('');
  };

  const addCategory = () => {
    setNewCategory([...newCategory, newCategoryInput]);
    setNewCategoryInput('');
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Movies</h1>

      <div>
        <label>Movie Title:</label>
        <input
          type="text"
          placeholder="Enter movie title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Age Rating (e.g., G, PG13, NC17):</label>
        <input
          type="text"
          placeholder="Enter movie age rating"
          value={newMovieAgeRating}
          onChange={(e) => setNewMovieAgeRating(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Review Rating (0-5):</label>
        <input
          type="number"
          placeholder="Review Rating (0-5)"
          min={0}
          max={5}
          value={newReviewRating}
          onChange={(e) => setNewReviewRating(Number(e.target.value))}
          className="border p-2 mr-2"
        />

        <label>Director:</label>
        <input
          type="text"
          placeholder="Enter director name"
          value={newDirector}
          onChange={(e) => setNewDirector(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Synopsis:</label>
        <textarea
          placeholder="Enter movie synopsis"
          value={newSynopsis}
          onChange={(e) => setNewSynopsis(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Child Price:</label>
        <input
          type="number"
          placeholder="Child price"
          min={0}
          value={newChildPrice}
          onChange={(e) => setNewChildPrice(Number(e.target.value))}
          className="border p-2 mr-2"
        />

        <label>Adult Price:</label>
        <input
          type="number"
          placeholder="Adult price"
          min={0}
          value={newAdultPrice}
          onChange={(e) => setNewAdultPrice(Number(e.target.value))}
          className="border p-2 mr-2"
        />

        <label>Senior Price:</label>
        <input
          type="number"
          placeholder="Senior price"
          min={0}
          value={newSeniorPrice}
          onChange={(e) => setNewSeniorPrice(Number(e.target.value))}
          className="border p-2 mr-2"
        />

        <label>Online Fee:</label>
        <input
          type="number"
          placeholder="Online fee"
          min={0}
          value={newOnlineFee}
          onChange={(e) => setNewOnlineFee(Number(e.target.value))}
          className="border p-2 mr-2"
        />

        <label>Poster URL:</label>
        <input
          type="text"
          placeholder="Poster URL"
          value={newPosterUrl}
          onChange={(e) => setNewPosterUrl(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Trailer URL:</label>
        <input
          type="text"
          placeholder="Trailer URL"
          value={newTrailerUrl}
          onChange={(e) => setNewTrailerUrl(e.target.value)}
          className="border p-2 mr-2"
        />

        <label>Is Running:</label>
        <div className="mt-2">
          <label>
            <input
              type="checkbox"
              checked={newIsRunning}
              onChange={(e) => setNewIsRunning(e.target.checked)}
            />
            Currently Running
          </label>
        </div>

        <label>Cast Member:</label>
        <input
          type="text"
          placeholder="Add cast member"
          value={newCastMember}
          onChange={(e) => setNewCastMember(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addCastMember} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Cast Member
        </button>

        <label>Category:</label>
        <input
          type="text"
          placeholder="Add category"
          value={newCategoryInput}
          onChange={(e) => setNewCategoryInput(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Category
        </button>

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
            <li key={movie.id || index} className="mb-2">
              <strong>{movie.title}</strong> - {movie.category?.join(', ') || 'No category'}
              <button
                onClick={() => movie.id && deleteMovie(movie.id)}
                className="ml-4 text-red-500"
              >
                Delete
              </button>
              <div>Poster URL: {movie.posterUrl}</div>
              <div>Trailer URL: {movie.trailerUrl}</div>
              <div>Cast: {movie.cast?.join(', ') || 'No cast'}</div>
              <div>Review Rating: {movie.reviewRating}</div>
              <div>Running: {movie.isRunning ? 'Yes' : 'No'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageMovies;
