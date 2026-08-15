import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [lastSubmittedQuery, setLastSubmittedQuery] = useState('')

  const handleSearch = (query) => {
    // Temporary placeholder for Phase 2.
    // Phase 3 will replace this with the Open Library API call.
    setLastSubmittedQuery(query)
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

        {lastSubmittedQuery ? (
          <p className="app-placeholder">
            Search submitted for: <strong>{lastSubmittedQuery}</strong>
          </p>
        ) : (
          <p className="app-placeholder">
            Search for a book or author to get started.
          </p>
        )}
      </main>

      <footer className="app-footer">
        <p>Data provided by the Open Library API.</p>
      </footer>
    </div>
  )
}

export default App
