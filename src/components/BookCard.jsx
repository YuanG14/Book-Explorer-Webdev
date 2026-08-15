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
    <article
      className="book-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
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
            <span className="book-card__cover-placeholder-icon">&#128214;</span>
            <span className="book-card__cover-placeholder-text">No cover available</span>
          </div>
        )}
        <span className="book-card__hint">View details</span>
      </div>

      <div className="book-card__body">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">{author}</p>
        <p className="book-card__year">First published &middot; {year}</p>
      </div>
    </article>
  )
}

export default BookCard
