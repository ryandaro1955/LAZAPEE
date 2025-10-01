import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search products..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="search-bar"
  />
);

export default SearchBar;
