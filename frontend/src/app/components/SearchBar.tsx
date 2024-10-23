import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  genreTerm: string;
  setGenreTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, genreTerm, setGenreTerm}) => {
  return (
    <div className="p-5 w-full">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-400 p-2 w-9/10 text-black"
      />
      <select
        className="border border-gray-400 bg-white text-black w-1/10 h-full p-2"
        value={genreTerm}
        onChange={(e) => setGenreTerm(e.target.value)}
      >
        <option value="">Genre</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Cocumentary">Documentary</option>
        <option value="Drama">Drama</option>
      </select>
    </div>
  );
};

export default SearchBar;
