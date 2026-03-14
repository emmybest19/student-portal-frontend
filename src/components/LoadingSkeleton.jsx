function LoadingSkeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-100/80 ${className}`}
      aria-hidden="true"
    />
  )
}

export default LoadingSkeleton

