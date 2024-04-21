import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../consts";

function Results({ searchQuery }){
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    fetch(`${API_URL}/search?query=${query}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(results => {
      setSearchResults(results);
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    });
  };

  // Call handleSearch when searchQuery changes
  useState(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((song) => (
          <li key={song.id}>
            <Link to={`/details/${song.id}`}>{song.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;