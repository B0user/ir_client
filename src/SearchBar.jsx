import { useState } from 'react';
import './main.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style = {{paddingLeft: '3rem', paddingTop: '2rem',}}>
    <input
      type="text"
      placeholder="Поиск"
      value={searchTerm}
      onChange={handleSearch}
      style = {{
        paddingLeft: '1rem',
        border: 'none',
        borderBottom: '1px solid gray',
        outline: 'none',
        fontSize: '18px'
      }}
    />
    </div>
  );
};

export default SearchBar;
