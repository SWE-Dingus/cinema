"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Config from "../../../../frontend.config";
import "../../globals.css";

interface ShowTime {
  showID: number;
  movieID: number;
  showRoomID: number;
  showTime: string;
  durationMinutes: number;
  movieTitle?: string; // Include movie title
}

const AdminShowtimes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showtimes, setShowtimes] = useState<ShowTime[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredShowtimes, setFilteredShowtimes] = useState<ShowTime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddingShowtime, setIsAddingShowtime] = useState(false);
  const [validMovies, setValidMovies] = useState<
    { id: number; title: string }[]
  >([]);

  const [movieID, setMovieID] = useState<number | null>(null);
  const [showRoomID, setShowRoomID] = useState<number | null>(null);
  const [showTime, setShowTime] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);

  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/shows/getAll`);
        if (!response.ok) {
          throw new Error("Failed to fetch showtimes");
        }
        const data: ShowTime[] = await response.json();

        // Fetch movie titles for each showtime
        const movieTitles = await Promise.all(
          data.map(async (showtime) => {
            try {
              const movieResponse = await fetch(
                `${Config.apiRoot}/movies/get/${showtime.movieID}`
              );
              const movieData = await movieResponse.json();
              return { ...showtime, movieTitle: movieData.title };
            } catch {
              return { ...showtime, movieTitle: "Unknown" };
            }
          })
        );

        setShowtimes(movieTitles);
        setFilteredShowtimes(movieTitles);

        // Determine min and max dates
        if (movieTitles.length > 0) {
          const dates = movieTitles.map((show) => new Date(show.showTime));
          setMinDate(new Date(Math.min(...dates.map((d) => d.getTime()))));
          setMaxDate(new Date(Math.max(...dates.map((d) => d.getTime()))));
        }
      } catch (err) {
        setError(
          (err as Error).message ||
            "An error occurred while fetching showtimes."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  useEffect(() => {
    const fetchValidMovies = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/getAll`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const movies = await response.json();

        // Filter movies with release dates on or before the current day
        const today = new Date().toISOString().split("T")[0];
        const filteredMovies = movies.filter(
          (movie: { releaseDate: string }) => movie.releaseDate <= today
        );

        // Map to include only id and title for dropdown
        setValidMovies(
          filteredMovies.map((movie: { id: number; title: string }) => ({
            id: movie.id,
            title: movie.title,
          }))
        );
      } catch (error) {
        console.error("Error fetching valid movies:", error);
      }
    };

    fetchValidMovies();
  }, []);

  const filterByDate = (date: Date | null) => {
    if (!date) {
      setFilteredShowtimes(showtimes);
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const filtered = showtimes.filter((show) => {
      const showDate = new Date(show.showTime).toISOString().split("T")[0];
      return showDate === formattedDate;
    });

    setFilteredShowtimes(filtered);
  };

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    filterByDate(value);
  };

  const handleShowAllClick = () => {
    setSelectedDate(null); // Unselect the date in the calendar
    filterByDate(null); // Show all showtimes
  };

  const handleAddShowtimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!movieID || !showRoomID || !showTime || !durationMinutes) {
      alert("Please fill in all the fields.");
      return;
    }
  
    try {
      // Append ":00" to ensure seconds are included, then convert to ISO string
      const formattedShowTime = new Date(`${showTime}:00`).toISOString();
  
      const response = await fetch(`${Config.apiRoot}/shows/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieID,
          showRoomID,
          showTime: formattedShowTime,
          durationMinutes,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse the JSON error response
        if (errorData.message) {
          throw new Error(errorData.message); // Throw the error message from the backend
        } else {
          throw new Error("Failed to add showtime. Please try again.");
        }
      }
  
      alert("Showtime added successfully.");
      setIsAddingShowtime(false);
  
      // Refresh the showtimes
      const newShowtime = {
        movieID,
        showRoomID,
        showTime: formattedShowTime,
        durationMinutes,
      } as ShowTime;
  
      const updatedShowtimes = [...showtimes, newShowtime];
      setShowtimes(updatedShowtimes);
  
      // Recalculate minDate and maxDate
      const dates = updatedShowtimes.map((show) => new Date(show.showTime));
      setMinDate(new Date(Math.min(...dates.map((d) => d.getTime()))));
      setMaxDate(new Date(Math.max(...dates.map((d) => d.getTime()))));
  
      // Filter for the current date
      filterByDate(selectedDate);
    } catch (err) {
      alert(`Error: ${(err as Error).message}`); // Show the error to the admin
    }
  };

  const handleDeleteShowtime = async (showID: number) => {
    try {
      const response = await fetch(`${Config.apiRoot}/shows/delete/${showID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete showtime");
      }

      alert("Showtime deleted successfully.");

      // Remove the deleted showtime from both `showtimes` and `filteredShowtimes`
      const updatedShowtimes = showtimes.filter(
        (show) => show.showID !== showID
      );
      setShowtimes(updatedShowtimes);

      // Re-filter the showtimes for the currently selected date
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const updatedFilteredShowtimes = updatedShowtimes.filter((show) => {
          const showDate = new Date(show.showTime).toISOString().split("T")[0];
          return showDate === formattedDate;
        });
        setFilteredShowtimes(updatedFilteredShowtimes);
      } else {
        setFilteredShowtimes(updatedShowtimes);
      }
    } catch (err) {
      setError(
        (err as Error).message ||
          "An error occurred while deleting the showtime."
      );
    }
  };

  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Error</h1>
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1b0c1a] text-white">
      <div className="p-5">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Manage Showtimes
        </h1>
        <div className="flex flex-col items-center text-calendarText">
          <Calendar
            onChange={(date) => handleDateChange(date as Date)}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            className="mx-auto mb-8"
          />
          <button
            onClick={() => setIsAddingShowtime(!isAddingShowtime)}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded transition-transform duration-200 hover:bg-green-600 hover:scale-105"
          >
            {isAddingShowtime ? "Cancel" : "Add Showtime"}
          </button>
          <button
            onClick={handleShowAllClick}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
          >
            See All Showtimes
          </button>
          <button
            onClick={() => (window.location.href = "/admin")}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
          >
            Back to Admin Home
          </button>
        </div>
      </div>

      {isAddingShowtime && (
        <div className="flex flex-col items-center p-5">
          <h2 className="text-2xl font-bold mb-4">Add New Showtime</h2>
          <form
            onSubmit={handleAddShowtimeSubmit}
            className="w-full max-w-md space-y-4 text-black"
          >
            {/* Dropdown for selecting Movie ID */}
            <select
              value={movieID || ""}
              onChange={(e) => setMovieID(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="" disabled>
                Select Movie
              </option>
              {validMovies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} (ID: {movie.id})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Show Room ID"
              value={showRoomID || ""}
              onChange={(e) => setShowRoomID(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="datetime-local"
              value={showTime}
              onChange={(e) => setShowTime(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={durationMinutes || ""}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold mb-6">Showtimes</h1>
        {filteredShowtimes.length > 0 ? (
          <ul className="w-full max-w-4xl">
            {filteredShowtimes.map((show) => (
              <li key={show.showID} className="mb-4 p-4 bg-gray-800 rounded">
                <p className="text-lg">
                  Showtime: {new Date(show.showTime).toLocaleString()}
                </p>
                <p>Duration: {show.durationMinutes} minutes</p>
                <p>Movie ID: {show.movieID}</p>
                <p>Movie Title: {show.movieTitle || "Unknown"}</p>
                <div className="flex mt-2 space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteShowtime(show.showID)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No showtimes available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default AdminShowtimes;