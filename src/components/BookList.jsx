import { memo } from 'react'
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

// Memoized so typing in the search box (which re-renders App on every
// keystroke) or opening the details modal doesn't re-render the whole
// grid — it only re-renders when `books` or `onBookClick` actually
// change, which matters once the list has grown past a couple pages.
export default memo(BookList)
