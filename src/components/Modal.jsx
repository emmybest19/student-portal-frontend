import Button from './Button.jsx'

function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-lg rounded-2xl shadow-xl"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="flex items-center justify-between border-b px-5 py-3"
          style={{
            borderColor: 'var(--border-color)',
          }}
        >
          <h2
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 transition-colors"
            style={{
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--bg-secondary)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div
          className="flex justify-end gap-3 border-t px-5 py-3"
          style={{
            borderColor: 'var(--border-color)',
          }}
        >
          <Button variant="ghost" type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal

