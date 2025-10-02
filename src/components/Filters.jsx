import React from 'react';

const Filters = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange }) => (
  <div className="filters">
    <select value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <input
      type="range"
      min={priceRange[0]}
      max={priceRange[1]}
      value={priceRange[2]}
      onChange={e => onPriceChange(Number(e.target.value))}
    />
    <span>Max Price: ${priceRange[2]}</span>
  </div>
);

export default Filters;
