import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon" aria-hidden="true">
        &#33;
      </span>
      <p className="error-message__eyebrow">Something went wrong</p>
      <p className="error-message__title">We couldn&rsquo;t reach the library right now.</p>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="error-message__retry"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
