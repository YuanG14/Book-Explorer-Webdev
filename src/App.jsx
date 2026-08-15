import './App.css'

function App() {
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
        <p className="app-placeholder">
          Search for a book or author to get started.
        </p>
      </main>

      <footer className="app-footer">
        <p>Data provided by the Open Library API.</p>
      </footer>
    </div>
  )
}

export default App
