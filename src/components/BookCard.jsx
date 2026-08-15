import './BookCard.css'

function formatAuthors(authorNames) {
  if (!authorNames || authorNames.length === 0) {
    return 'Unknown author'
  }
  return authorNames.join(', ')
}

function BookCard({ book, onBookClick }) {
  const title = book.title || 'Untitled'
  const author = formatAuthors(book.author_name)
  const year = book.first_publish_year ? book.first_publish_year : 'Unknown'
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null

  const handleClick = () => {
    if (onBookClick) {
      onBookClick(book)
    }
  }

  return (
    <div
      className="book-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="book-card__cover">
        {coverUrl ? (
          <img src={coverUrl} alt={`${title} cover`} loading="lazy" />
        ) : (
          <div className="book-card__cover-placeholder" aria-label="No cover available">
            <span className="book-card__cover-placeholder-icon">📚</span>
            <span className="book-card__cover-placeholder-text">
              No Cover Available
            </span>
          </div>
        )}
      </div>

      <div className="book-card__body">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">{author}</p>
        <p className="book-card__year">First published: {year}</p>
      </div>
    </div>
  )
}

export default BookCard
