import { useEffect, useRef } from 'react'
import './BookDetails.css'

function formatAuthors(authorNames) {
  if (!authorNames || authorNames.length === 0) {
    return 'Unknown author'
  }
  return authorNames.join(', ')
}

const MAX_SUBJECTS = 8

function BookDetails({ book, onClose }) {
  const backdropRef = useRef(null)

  // Escape key closes the modal. Cleaned up on unmount / book change.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Lock background scrolling while the modal is open, and always
  // restore it on close/unmount so the page never gets stuck.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  if (!book) {
    return null
  }

  const title = book.title || 'Untitled'
  const author = formatAuthors(book.author_name)
  const year = book.first_publish_year ? book.first_publish_year : 'Unknown'
  const editionCount = book.edition_count ? book.edition_count : null
  const subjects = Array.isArray(book.subject)
    ? book.subject.slice(0, MAX_SUBJECTS)
    : []
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null
  const primarySubject = subjects.length > 0 ? subjects[0] : null

  const handleBackdropClick = (e) => {
    // Only close when the click landed on the backdrop itself, not
    // something inside the modal that bubbled up.
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  return (
    <div
      className="book-details-backdrop"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        className="book-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-details-title"
      >
        <button
          type="button"
          className="book-details__close-icon"
          onClick={onClose}
          aria-label="Close book details"
        >
          &#10005;
        </button>

        <div className="book-details__content">
          <div className="book-details__cover">
            {coverUrl ? (
              <img src={coverUrl} alt={`${title} cover`} />
            ) : (
              <div
                className="book-details__cover-placeholder"
                aria-label="No cover available"
              >
                <span className="book-details__cover-placeholder-icon">
                  &#128214;
                </span>
                <span className="book-details__cover-placeholder-text">
                  No cover available
                </span>
              </div>
            )}
          </div>

          <div className="book-details__info">
            {primarySubject && (
              <p className="book-details__eyebrow">{primarySubject}</p>
            )}
            <h2 id="book-details-title" className="book-details__title">
              {title}
            </h2>
            <p className="book-details__author">{author}</p>

            <div className="book-details__meta">
              <div className="book-details__meta-item">
                <span className="book-details__meta-label">First published</span>
                <span className="book-details__meta-value">{year}</span>
              </div>
              <div className="book-details__meta-item">
                <span className="book-details__meta-label">Editions</span>
                <span className="book-details__meta-value">
                  {editionCount ? editionCount : 'Not available'}
                </span>
              </div>
            </div>

            <div className="book-details__subjects">
              <h3 className="book-details__subjects-title">Subjects</h3>
              {subjects.length > 0 ? (
                <div className="book-details__subject-tags">
                  {subjects.map((subject) => (
                    <span key={subject} className="book-details__subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="book-details__subjects-empty">
                  No subjects available.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="book-details__footer">
          <button
            type="button"
            className="book-details__close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
