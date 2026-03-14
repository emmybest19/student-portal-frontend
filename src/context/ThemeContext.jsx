import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Check system preference
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    setMounted(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const htmlElement = document.documentElement
    if (isDark) {
      htmlElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark, mounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const value = {
    isDark,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
