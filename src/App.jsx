import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import './App.css'

function App() {
  // Controlled input value (Phase 2).
  const [searchQuery, setSearchQuery] = useState('')

  // The term that was actually submitted. Only this triggers the API call,
  // so typing alone never fires a request.
  const [searchTerm, setSearchTerm] = useState('')

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = (query) => {
    // Validation already happened in SearchBar; this just records the
    // submitted term, which the useEffect below reacts to.
    setSearchTerm(query)
  }

  useEffect(() => {
    // Don't fetch on initial render, when there's no submitted term yet.
    if (searchTerm === '') {
      return
    }

    const fetchBooks = async () => {
      setError('')
      setLoading(true)

      try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchTerm
        )}&limit=20`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch books.')
        }

        const data = await response.json()
        setBooks(data.docs || [])
      } catch (err) {
        setError('Something went wrong. Please try again.')
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchTerm])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__mark">📚</span>
          <h1 className="app-header__title">Book Search</h1>
        </div>
        <p className="app-header__subtitle">
          Find books by title or author, powered by Open Library.
        </p>
      </header>

      <main className="app-main">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* Temporary results verification for Phase 3.
            BookList / BookCard arrive in Phase 5. */}
        <div className="app-results-preview">
          {loading && <p className="app-placeholder">Searching...</p>}

          {!loading && error && (
            <p className="app-placeholder app-placeholder--error">{error}</p>
          )}

          {!loading && !error && searchTerm === '' && (
            <p className="app-placeholder">
              Search for a book or author to get started.
            </p>
          )}

          {!loading && !error && searchTerm !== '' && books.length === 0 && (
            <p className="app-placeholder">No books found.</p>
          )}

          {!loading && !error && books.length > 0 && (
            <div className="app-results-preview__list">
              <p className="app-placeholder">{books.length} books found</p>
              <ul>
                {books.map((book, index) => (
                  <li key={`${book.key || book.title}-${index}`}>
                    {book.title}
                    {book.author_name ? ` — ${book.author_name.join(', ')}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Data provided by the Open Library API.</p>
      </footer>
    </div>
  )
}

export default App
