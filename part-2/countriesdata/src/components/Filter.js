import React from 'react';

const Filter = ({searchText, setSearchText}) => {
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      find countries:
      <input value={searchText} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;