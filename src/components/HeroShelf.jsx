import { useState } from 'react'
import './HeroShelf.css'

// A small curated set of classic covers used purely as decoration in the
// hero. If any cover fails to load (offline, blocked, id changed) it is
// simply hidden rather than showing a broken image icon.
const SHELF_BOOKS = [
  { isbn: '9780441013593', title: 'Dune' },
  { isbn: '9780547928227', title: 'The Hobbit' },
  { isbn: '9780451524935', title: 'Nineteen Eighty-Four' },
  { isbn: '9780141439518', title: 'Pride and Prejudice' },
  { isbn: '9780743273565', title: 'The Great Gatsby' },
]

function HeroShelf() {
  const [failed, setFailed] = useState({})

  const handleError = (isbn) => {
    setFailed((prev) => ({ ...prev, [isbn]: true }))
  }

  const visibleBooks = SHELF_BOOKS.filter((book) => !failed[book.isbn])

  if (visibleBooks.length === 0) {
    return null
  }

  return (
    <div className="hero-shelf" aria-hidden="true">
      {SHELF_BOOKS.map((book, index) =>
        failed[book.isbn] ? null : (
          <img
            key={book.isbn}
            className={`hero-shelf__cover hero-shelf__cover--${index}`}
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
            alt=""
            loading="lazy"
            onError={() => handleError(book.isbn)}
          />
        )
      )}
    </div>
  )
}

export default HeroShelf
