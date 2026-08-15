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
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for a book or author..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search for a book or author"
        />
        <button type="submit" className="search-bar__button">
          Search
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
