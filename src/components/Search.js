import React from "react";

function Search({ search, setSearch }) {
  
  function handleSearch(event) {
    setSearch(event.target.value)
  }
  
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        value={search}
        placeholder="Search your Recent Transactions"
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;