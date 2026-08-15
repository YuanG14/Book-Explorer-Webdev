import './Loading.css'

function Loading() {
  return (
    <div className="loading">
      <span className="loading__spinner" aria-hidden="true" />
      <p className="loading__text">Searching for books...</p>
    </div>
  )
}

export default Loading
