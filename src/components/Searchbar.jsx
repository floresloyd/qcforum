/* eslint-disable react/prop-types */
import "./Searchbar.css"; // Make sure to import the CSS file
import { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("professor"); // default search type

  const handleSearch = () => {
    onSearch(searchType, searchTerm);
  };

  return (
    <div className="search-container">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="professor">Professor Last Name</option>
        <option value="class">Coursecode </option>
        <option value="postTitle">Post Title</option>
      </select>
      <input
        type="text"
        placeholder={`Search by ${searchType}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
