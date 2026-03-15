import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="text-center max-w-md">
        <h1
          className="text-9xl font-bold mb-4"
          style={{ color: 'var(--color-primary)' }}
        >
          404
        </h1>
        <h2
          className="text-4xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h2>
        <p
          className="text-lg mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 text-white font-semibold rounded-lg transition duration-200 hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
            }}
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 font-semibold rounded-lg transition duration-200"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
