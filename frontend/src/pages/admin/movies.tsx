import React, { useState, useEffect } from "react";

enum AgeRating {
  G = "G",
  PG = "PG",
  PG13 = "PG13",
  R = "R",
  NC17 = "NC17",
}

interface Movie {
  id?: number; // Include ID for backend reference
  title: string;
  ageRating: AgeRating;
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
  const [newMovieTitle, setNewMovieTitle] = useState<string>("");
  const [newMovieAgeRating, setNewMovieAgeRating] = useState<AgeRating>(
    AgeRating.G,
  );
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newCast, setNewCast] = useState<string[]>([]);
  const [newDirector, setNewDirector] = useState<string>("");
  const [newSynopsis, setNewSynopsis] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string[]>([]);
  const [newChildPrice, setNewChildPrice] = useState<number>(0);
  const [newAdultPrice, setNewAdultPrice] = useState<number>(0);
  const [newSeniorPrice, setNewSeniorPrice] = useState<number>(0);
  const [newOnlineFee, setNewOnlineFee] = useState<number>(0);
  const [newPosterUrl, setNewPosterUrl] = useState<string>("");
  const [newTrailerUrl, setNewTrailerUrl] = useState<string>("");
  const [newIsRunning, setNewIsRunning] = useState<boolean>(false);
  const [newCastMember, setNewCastMember] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movies/getAll");
      const data = await response.json();

      const initializedMovies = data.map((movie: Movie) => ({
        ...movie,
        category: movie.category || [],
        cast: movie.cast || [],
      }));

      setMovies(initializedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
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
      const response = await fetch("http://localhost:8080/api/movies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const savedMovie = await response.json();
      setMovies((prevMovies) => [...prevMovies, savedMovie]); // Update the list with the new movie
      resetMovieFields();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const deleteMovie = async (movieId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movies/delete/${movieId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const resetMovieFields = () => {
    setNewMovieTitle("");
    setNewMovieAgeRating(AgeRating.G);
    setNewReviewRating(0);
    setNewCast([]);
    setNewDirector("");
    setNewSynopsis("");
    setNewCategory([]);
    setNewChildPrice(0);
    setNewAdultPrice(0);
    setNewSeniorPrice(0);
    setNewOnlineFee(0);
    setNewPosterUrl("");
    setNewTrailerUrl("");
    setNewIsRunning(false);
  };

  const addCastMember = () => {
    setNewCast([...newCast, newCastMember]);
    setNewCastMember("");
  };

  const addCategory = () => {
    setNewCategory([...newCategory, newCategoryInput]);
    setNewCategoryInput("");
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Movies</h1>

      {/* Movie Input Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Movie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Movie Title</label>
            <input
              type="text"
              placeholder="Enter movie title"
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age Rating</label>
            <select
              value={newMovieAgeRating}
              onChange={(e) => {
                setNewMovieAgeRating(
                  AgeRating[e.target.value as keyof typeof AgeRating],
                );
              }}
            >
              {(() => {
                const members = [];
                for (const member in AgeRating) {
                  members.push(member);
                }
                return members.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ));
              })()}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Review Rating (0-5)
            </label>
            <input
              type="number"
              placeholder="Review Rating (0-5)"
              min={0}
              max={5}
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Director</label>
            <input
              type="text"
              placeholder="Enter director name"
              value={newDirector}
              onChange={(e) => setNewDirector(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Synopsis</label>
            <textarea
              placeholder="Enter movie synopsis"
              value={newSynopsis}
              onChange={(e) => setNewSynopsis(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Child Price</label>
            <input
              type="number"
              placeholder="Child price"
              min={0}
              value={newChildPrice}
              onChange={(e) => setNewChildPrice(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Adult Price</label>
            <input
              type="number"
              placeholder="Adult price"
              min={0}
              value={newAdultPrice}
              onChange={(e) => setNewAdultPrice(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senior Price</label>
            <input
              type="number"
              placeholder="Senior price"
              min={0}
              value={newSeniorPrice}
              onChange={(e) => setNewSeniorPrice(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Online Fee</label>
            <input
              type="number"
              placeholder="Online fee"
              min={0}
              value={newOnlineFee}
              onChange={(e) => setNewOnlineFee(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Poster URL</label>
            <input
              type="text"
              placeholder="Poster URL"
              value={newPosterUrl}
              onChange={(e) => setNewPosterUrl(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Trailer URL</label>
            <input
              type="text"
              placeholder="Trailer URL"
              value={newTrailerUrl}
              onChange={(e) => setNewTrailerUrl(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Currently Running
            </label>
            <div className="mt-2">
              <input
                type="checkbox"
                checked={newIsRunning}
                onChange={(e) => setNewIsRunning(e.target.checked)}
                className="mr-2"
              />
              <span>Currently Running</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Cast Member</label>
            <input
              type="text"
              placeholder="Add cast member"
              value={newCastMember}
              onChange={(e) => setNewCastMember(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={addCastMember}
              className="bg-blue-500 text-white mt-2 px-4 py-2 rounded"
            >
              Add Cast Member
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              placeholder="Add category"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={addCategory}
              className="bg-green-500 text-white mt-2 px-4 py-2 rounded"
            >
              Add Category
            </button>
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={addMovie}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mt-4"
            >
              Add Movie
            </button>
          </div>
        </div>
      </div>

      {/* Movie List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-3">Existing Movies</h2>
        <ul className="divide-y divide-gray-200">
          {movies.map((movie, index) => (
            <li key={movie.id || index} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{movie.title}</strong> -{" "}
                  {movie.category?.join(", ") || "No category"}
                  <div>Poster URL: {movie.posterUrl}</div>
                  <div>Trailer URL: {movie.trailerUrl}</div>
                  <div>Cast: {movie.cast?.join(", ") || "No cast"}</div>
                  <div>Review Rating: {movie.reviewRating}</div>
                  <div>Running: {movie.isRunning ? "Yes" : "No"}</div>
                </div>
                <button
                  onClick={() => movie.id && deleteMovie(movie.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageMovies;
