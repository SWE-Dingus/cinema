import React, { useState, useEffect } from "react";
import Config from "../../../frontend.config";
import { Movie } from "../../app/models/Movie";
import "../../app/globals.css";

enum AgeRating {
  G = "G",
  PG = "PG",
  PG13 = "PG13",
  R = "R",
  NC17 = "NC17",
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

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/getAll`);
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
      trailerId: newTrailerUrl,
      isRunning: newIsRunning,
    };

    try {
      const response = await fetch(`${Config.apiRoot}/movies/create`, {
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
      setMovies((prevMovies) => [...prevMovies, savedMovie]);
      resetMovieFields();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const deleteMovie = async (movieId: number) => {
    try {
      const response = await fetch(
        `${Config.apiRoot}/movies/delete/${movieId}`,
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
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage Movies</h1>

      {/* Movie Input Form */}
      <div className="bg-[#2a1c2a] p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-[#fadcd5]">
          Add New Movie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Movie Title</label>
            <input
              type="text"
              placeholder="Enter movie title"
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            >
              {Object.keys(AgeRating).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Director</label>
            <input
              type="text"
              placeholder="Enter director name"
              value={newDirector}
              onChange={(e) => setNewDirector(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Synopsis</label>
            <textarea
              placeholder="Enter movie synopsis"
              value={newSynopsis}
              onChange={(e) => setNewSynopsis(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
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
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Poster URL</label>
            <input
              type="text"
              placeholder="Poster URL"
              value={newPosterUrl}
              onChange={(e) => setNewPosterUrl(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Trailer ID</label>
            <input
              type="text"
              placeholder="Trailer ID"
              value={newTrailerUrl}
              onChange={(e) => setNewTrailerUrl(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newIsRunning}
              onChange={(e) => setNewIsRunning(e.target.checked)}
              className="mr-2"
            />
            <label className="block text-sm font-medium">
              Currently Running
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Cast Members</label>
            <div>{newCast.join(", ") || "No cast members"}</div>
            <input
              type="text"
              placeholder="Add cast member"
              value={newCastMember}
              onChange={(e) => setNewCastMember(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
            <button
              onClick={addCastMember}
              className="bg-[#6f42c1] text-white mt-2 px-4 py-2 rounded hover:bg-[#5a32a1] transition"
            >
              Add Cast Member
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">Categories</label>
            <div>{newCategory.join(", ") || "No categories"}</div>
            <input
              type="text"
              placeholder="Add category"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full bg-[#3b2d3b] text-white focus:outline-none focus:ring-2 focus:ring-[#fadcd5]"
            />
            <button
              onClick={addCategory}
              className="bg-[#28a745] text-white mt-2 px-4 py-2 rounded hover:bg-[#218838] transition"
            >
              Add Category
            </button>
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={addMovie}
              className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded w-full mt-6 transition"
            >
              Add Movie
            </button>
          </div>
        </div>
      </div>

      {/* Movie List */}
      <div className="bg-[#2a1c2a] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#fadcd5]">
          Existing Movies
        </h2>
        <ul className="divide-y divide-gray-200">
          {movies.map((movie, index) => (
            <li key={movie.id || index} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{movie.title}</strong> -{" "}
                  {movie.category?.join(", ") || "No category"}
                  <div>Poster URL: {movie.posterUrl || "No poster"}</div>
                  <div>
                    Trailer YouTube ID: {movie.trailerId || "No trailer"}
                  </div>
                  <div>Cast: {movie.cast?.join(", ") || "No cast"}</div>
                  <div>Review Rating: {movie.reviewRating}</div>
                  <div>Running: {movie.isRunning ? "Yes" : "No"}</div>
                </div>
                <button
                  onClick={() => movie.id && deleteMovie(movie.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
