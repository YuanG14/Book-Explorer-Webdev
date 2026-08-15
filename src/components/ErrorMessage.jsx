import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <span className="error-message__icon" aria-hidden="true">
        ⚠️
      </span>
      <p className="error-message__title">Something went wrong.</p>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="error-message__retry"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
