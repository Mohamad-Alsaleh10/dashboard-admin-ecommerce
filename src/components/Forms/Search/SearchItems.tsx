import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchItems = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchSuggestions = async (searchQuery) => {
    const headers = {
      Accept: 'application/json',
      language: 'en',
      currency: 'Dinar',
      Authorization: `Bearer ${getToken()}`,
    };

    try {
      const response = await axios.get(`https://api.alorfi-store.com/superAdmin_api/show_items?search=${searchQuery}`, { headers });
      const data = response.data;
      if (data.success) {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  // Debounced function to fetch suggestions
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (suggestions.length > 0) {
      const item = suggestions[0]; // Navigate to the first suggested item
      navigate(`/viewproduct/${item.id}`);
    } else {
      setLoading(true);
      setError(null);
      try {
        const headers = {
          Accept: 'application/json',
          language: 'en',
          currency: 'Dinar',
          Authorization: `Bearer ${getToken()}`,
        };
        const response = await axios.get(`https://api.alorfi-store.com/superAdmin_api/show_items?search=${query}`, { headers });
        const data = response.data;
        if (data.success && data.data.length > 0) {
          const item = data.data[0];
          navigate(`/viewproduct/${item.id}`);
        } else {
          setError('No items found');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto " style={{    top: "15px",
        position: "absolute",
        width: "30%",
        zIndex: "20",
        left: "50%",
        transform:"translateX(-50%)" }}> 
      <div className=" flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for items..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="border p-4 rounded "  style={{ opacity: suggestions.length === 0 ? '0' : '1' ,  background:"#00ffc440"}}
      >
        {suggestions.map((item) => (
          <div key={item.id} className="border-b p-2">
            <button
              onClick={() => navigate(`/viewproduct/${item.id}`)}
              className="text-light-500 hover:underline"
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchItems;
