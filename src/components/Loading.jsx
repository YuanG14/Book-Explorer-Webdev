import './Loading.css'

function Loading() {
  return (
    <div className="loading" role="status">
      <span className="loading__spinner" aria-hidden="true" />
      <p className="loading__title">Finding books&hellip;</p>
      <p className="loading__subtitle">Searching the Open Library catalog.</p>
    </div>
  )
}

export default Loading
