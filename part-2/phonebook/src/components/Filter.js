import React from 'react';

const Filter = ({searchText, setSearchText}) => {
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      filter shown with:
      <input value={searchText} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;