import './SearchBar.css'

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid="search-input"
      />
      {value && (
        <button 
          className="search-clear"
          onClick={() => onChange('')}
          data-testid="clear-search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar


