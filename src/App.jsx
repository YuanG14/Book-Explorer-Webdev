import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import Loading from './components/Loading.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import BookList from './components/BookList.jsx'
import BookDetails from './components/BookDetails.jsx'
import HeroShelf from './components/HeroShelf.jsx'
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

  // Tracks which book was clicked, so the details modal can be opened
  // for it. null means no modal is currently shown.
  const [selectedBook, setSelectedBook] = useState(null)

  const handleBookClick = (book) => {
    setSelectedBook(book)
  }

  const handleCloseDetails = () => {
    setSelectedBook(null)
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
          setError('We couldn\u2019t reach the library right now. Please try again.')
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
          <span className="state-message__glyph" aria-hidden="true">
            &#9670;
          </span>
          <p className="state-message__eyebrow">No results</p>
          <p className="state-message__title">No books found.</p>
          <p className="state-message__subtitle">
            Try another title or author &mdash; or check the spelling.
          </p>
        </div>
      )
    }

    if (hasSearched && books.length > 0) {
      const resultLabel = books.length === 1 ? 'book' : 'books'

      return (
        <div className="results">
          <div className="results__heading">
            <p className="results__eyebrow">Discover</p>
            <h2 className="results__title">
              {searchTerm ? `Results for \u201c${searchTerm}\u201d` : 'Search results'}
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
        <span className="state-message__glyph" aria-hidden="true">
          &#10022;
        </span>
        <p className="state-message__eyebrow">Ready to explore?</p>
        <p className="state-message__title">Start with a title or an author.</p>
        <p className="state-message__subtitle">
          Try &ldquo;dune&rdquo;, &ldquo;tolkien&rdquo;, or &ldquo;the hobbit&rdquo; to see
          what the catalog turns up.
        </p>
      </div>
    )
  }

  return (
    <div className="app">
      <section className="hero">
        <div className="hero__inner">
          <header className="site-header">
            <div className="site-header__brand">
              <span className="site-header__mark" aria-hidden="true">
                &#128214;
              </span>
              <span className="site-header__name">BOOKFIND</span>
            </div>
            <nav className="site-header__labels" aria-hidden="true">
              <span>Discover</span>
              <span>Search</span>
            </nav>
          </header>

          <div className="hero__body">
            <div className="hero__copy">
              <h1 className="hero__heading">
                Find your
                <br />
                next great read.
              </h1>
              <p className="hero__subtitle">
                Search millions of books and discover your next favorite
                story from the Open Library catalog.
              </p>

              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>

            <HeroShelf />
          </div>
        </div>
      </section>

      <main className="app-content">{renderContent()}</main>

      <footer className="app-footer">
        <p>Data provided by the Open Library API.</p>
      </footer>

      {selectedBook && (
        <BookDetails book={selectedBook} onClose={handleCloseDetails} />
      )}
    </div>
  )
}

export default App
