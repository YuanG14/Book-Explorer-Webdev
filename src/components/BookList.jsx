import BookCard from './BookCard.jsx'
import './BookList.css'

function BookList({ books, onBookClick }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard
          key={book.key || `${book.title}-${index}`}
          book={book}
          onBookClick={onBookClick}
        />
      ))}
    </div>
  )
}

export default BookList
