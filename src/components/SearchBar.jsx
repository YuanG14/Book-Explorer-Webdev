import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const [validationMessage, setValidationMessage] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    if (validationMessage) {
      setValidationMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (searchQuery.trim() === '') {
      setValidationMessage('Please enter a book title or author.')
      return
    }

    setValidationMessage('')
    onSearch(searchQuery.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} noValidate>
      <div className="search-bar__row">
        <span className="search-bar__icon" aria-hidden="true">
          &#128269;
        </span>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search a title or author..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search for a book or author"
        />
        <button type="submit" className="search-bar__button" aria-label="Search">
          <span className="search-bar__button-text">Search</span>
          <span className="search-bar__button-arrow" aria-hidden="true">
            &#8594;
          </span>
        </button>
      </div>

      {validationMessage && (
        <p className="search-bar__validation" role="alert">
          {validationMessage}
        </p>
      )}
    </form>
  )
}

export default SearchBar
