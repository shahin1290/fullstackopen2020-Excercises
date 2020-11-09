import React from 'react'

const Filter = ({ filterText, setFilterText }) => {
  const handleInputChange = (e) => {
    setFilterText(e.target.value)
  }

  return (
    <div>
      find countries:
      <input value={filterText} onChange={handleInputChange} />
    </div>
  )
}

export default Filter
