import { useState } from 'react'
import './SearchBar.css'

const MIN_SEARCH_LENGTH = 2

function SearchBar({ searchQuery, setSearchQuery, onSearch, isSubmitting }) {
  const [validationMessage, setValidationMessage] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    if (validationMessage) {
      setValidationMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Ignore extra submits while a search is already in flight, so
    // repeatedly clicking Search (or pressing Enter) can't pile up
    // duplicate requests against Open Library's API.
    if (isSubmitting) {
      return
    }

    const normalizedQuery = searchQuery.trim().replace(/\s+/g, ' ')

    if (normalizedQuery === '') {
      setValidationMessage('Please enter a book title or author.')
      return
    }

    if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
      setValidationMessage('Please enter at least 2 characters to search.')
      return
    }

    setValidationMessage('')
    onSearch(normalizedQuery)
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
        <button
          type="submit"
          className="search-bar__button"
          aria-label="Search"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <span className="search-bar__button-text">
            {isSubmitting ? 'Searching' : 'Search'}
          </span>
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
