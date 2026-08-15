import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import Loading from './components/Loading.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import BookList from './components/BookList.jsx'
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

  // Distinguishes "never searched yet" from "searched and got zero results".
  const [hasSearched, setHasSearched] = useState(false)

  // Bumped by the retry button so useEffect re-runs the same searchTerm.
  const [retryCount, setRetryCount] = useState(0)

  // Tracks which book was clicked. Phase 6 will use this to open a
  // details modal; for now nothing is rendered from it yet.
  const [selectedBook, setSelectedBook] = useState(null)

  const handleBookClick = (book) => {
    setSelectedBook(book)
  }

  const handleSearch = (query) => {
    // Validation already happened in SearchBar; this just records the
    // submitted term, which the useEffect below reacts to.
    setHasSearched(true)
    setSearchTerm(query)
  }

  useEffect(() => {
    // Don't fetch on initial render, when there's no submitted term yet.
    if (searchTerm === '') {
      return
    }

    const controller = new AbortController()

    const fetchBooks = async () => {
      setError('')
      setLoading(true)

      try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchTerm
        )}&limit=20`

        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Failed to fetch books.')
        }

        const data = await response.json()
        setBooks(data.docs || [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('We couldn\u2019t load the books right now. Please try again.')
          setBooks([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()

    return () => controller.abort()
  }, [searchTerm, retryCount])

  // Re-runs the same search term after a failed request.
  const handleRetry = () => {
    setRetryCount((count) => count + 1)
  }

  const renderContent = () => {
    if (loading) {
      return <Loading />
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={handleRetry} />
    }

    if (hasSearched && books.length === 0) {
      return (
        <div className="state-message">
          <span className="state-message__icon" aria-hidden="true">
            📚
          </span>
          <p className="state-message__title">No books found.</p>
          <p className="state-message__subtitle">
            Try searching for another title or author.
          </p>
        </div>
      )
    }

    if (hasSearched && books.length > 0) {
      const resultLabel = books.length === 1 ? 'book' : 'books'

      return (
        <div className="results">
          <div className="results__heading">
            <h2 className="results__title">
              {searchTerm ? `Results for "${searchTerm}"` : 'Search results'}
            </h2>
            <p className="results__count">
              {books.length} {resultLabel} found
            </p>
          </div>

          <BookList books={books} onBookClick={handleBookClick} />
        </div>
      )
    }

    return (
      <div className="state-message">
        <span className="state-message__icon" aria-hidden="true">
          📚
        </span>
        <p className="state-message__title">Discover Your Next Book</p>
        <p className="state-message__subtitle">
          Search for a book title or author to get started.
        </p>
      </div>
    )
  }

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

        <div className="app-content">{renderContent()}</div>
      </main>

      <footer className="app-footer">
        <p>Data provided by the Open Library API.</p>
      </footer>
    </div>
  )
}

export default App
