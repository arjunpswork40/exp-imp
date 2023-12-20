import "./Search.css";

function Search({ handleInputChange, query }) {
  return (
    <div>
       <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search."
        />
    </div>
  );
}

export default Search;
