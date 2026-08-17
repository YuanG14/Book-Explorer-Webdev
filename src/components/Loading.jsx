import './Loading.css'

function Loading({ query }) {
  return (
    <div className="loading" role="status">
      <span className="loading__spinner" aria-hidden="true" />
      <p className="loading__title">
        {query ? `Searching for \u201c${query}\u201d\u2026` : 'Finding books\u2026'}
      </p>
      <p className="loading__subtitle">Searching the Open Library catalog.</p>
    </div>
  )
}

export default Loading
