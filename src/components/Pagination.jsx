function Pagination({ page = 1, pageCount = 1, onPageChange }) {
  if (pageCount <= 1) return null

  const prevDisabled = page <= 1
  const nextDisabled = page >= pageCount

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
      <p>
        Page <span className="font-semibold">{page}</span> of{' '}
        <span className="font-semibold">{pageCount}</span>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={prevDisabled}
          onClick={() => !prevDisabled && onPageChange(page - 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => !nextDisabled && onPageChange(page + 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination

