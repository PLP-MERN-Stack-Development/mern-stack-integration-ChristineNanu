import { useState } from 'react';

function SearchFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ flex: '1' }}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => handleCategoryClick('')}
          className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Posts
        </button>
        <button 
          onClick={() => handleCategoryClick('Technology')}
          className={`btn ${selectedCategory === 'Technology' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Technology
        </button>
        <button 
          onClick={() => handleCategoryClick('Lifestyle')}
          className={`btn ${selectedCategory === 'Lifestyle' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Lifestyle
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;