import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../../assets/Logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    // Update cart count on mount and when cart changes
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(count)
    }

    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible with restaurant name */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 min-w-0">
            <img 
              src={logo} 
              alt="The Golden Rose" 
              className="h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full object-cover border-2 border-purple-200 shadow-md flex-shrink-0" 
            />
            <span className="text-sm sm:text-base md:text-xl font-bold text-gray-800 truncate">
              The Golden Rose
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-[#301934] border-b-2 border-[#301934]' : 'text-gray-700 hover:text-[#301934]'
              } px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`${
                isActive('/menu') ? 'text-[#301934] border-b-2 border-[#301934]' : 'text-gray-700 hover:text-[#301934]'
              } px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-[#301934] border-b-2 border-[#301934]' : 'text-gray-700 hover:text-[#301934]'
              } px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-[#301934] border-b-2 border-[#301934]' : 'text-gray-700 hover:text-[#301934]'
              } px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap`}
            >
              Contact
            </Link>
            <Link
              to="/checkout"
              className="relative p-2 text-gray-700 hover:text-[#301934] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/menu"
              className="bg-[#301934] hover:bg-[#4a2e58] text-white font-bold px-5 lg:px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#301934] hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Cart Link in Mobile Menu */}
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/checkout') ? 'bg-purple-50 text-[#301934] font-semibold' : 'text-gray-700 hover:bg-gray-100'
              } flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[24px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/') ? 'bg-purple-50 text-[#301934] font-semibold' : 'text-gray-700 hover:bg-gray-100'
              } block px-4 py-3 rounded-md text-base font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/menu') ? 'bg-purple-50 text-[#301934] font-semibold' : 'text-gray-700 hover:bg-gray-100'
              } block px-4 py-3 rounded-md text-base font-medium transition-colors`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/about') ? 'bg-purple-50 text-[#301934] font-semibold' : 'text-gray-700 hover:bg-gray-100'
              } block px-4 py-3 rounded-md text-base font-medium transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/contact') ? 'bg-purple-50 text-[#301934] font-semibold' : 'text-gray-700 hover:bg-gray-100'
              } block px-4 py-3 rounded-md text-base font-medium transition-colors`}
            >
              Contact
            </Link>
            
            {/* Order Now Button */}
            <div className="pt-2 px-2">
              <Link
                to="/menu"
                onClick={() => setIsOpen(false)}
                className="bg-[#301934] hover:bg-[#4a2e58] text-white font-bold px-6 py-3 rounded-full text-base text-center block transition-colors shadow-md"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
