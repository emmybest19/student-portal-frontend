import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "var(--color-secondary)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      style={{
        backgroundColor: "var(--navbar-bg)",
        color: "var(--navbar-text)",
      }}
      className="sticky top-0 transition-colors duration-200 z-50 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.div
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            CD
          </motion.div>
          <span className="text-sm font-semibold uppercase tracking-wide">
            Civil Engineering Dept.
          </span>
        </motion.div>

        {/* Mobile Menu Button */}

        

          {/* Navigation Links - Desktop */}
          <div className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium md:flex">
            <motion.div variants={itemVariants}>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link to="/" className="transition-colors">
                  Home
                </Link>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.div variants={linkVariants} whileHover="hover">
                <Link to="/about" className="transition-colors">
                  About
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Section */}
          <motion.div
            variants={itemVariants}
            className=" items-center gap-3 flex"
          >
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.button>

            {/* <div className=""> */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

            {/* Sign In Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex"
            >
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Sign in
              </Link>
            </motion.div>

            {/* Get Started Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex"
            >
              <Link
                to="/register"
                className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-black hover:bg-secondary/90 transition-colors"
              >
                Get started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      {/* </div> */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "var(--navbar-bg)",
              color: "var(--navbar-text)",
              borderColor: "var(--border-color)",
            }}
            className="md:hidden border-t transition-colors duration-200"
          >
            <div className="px-4 py-3 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Link
                  to="/"
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/about"
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{ borderColor: "var(--border-color)" }}
                className="border-t pt-2 mt-2"
              >
                <Link
                  to="/login"
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/register"
                  className="block w-full text-left px-4 py-2 rounded-lg bg-secondary/80 hover:bg-secondary transition-colors text-sm font-semibold text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
