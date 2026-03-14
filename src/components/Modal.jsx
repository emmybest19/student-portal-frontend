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
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-3">
          <Button variant="ghost" type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal

