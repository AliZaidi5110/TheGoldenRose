import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/Logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="The Golden Rose" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-forest-800">The Golden Rose</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${
                isActive('/products') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-700 hover:text-orange-600'
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              Contact
            </Link>
            <Link
              to="/products"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="md:hidden bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-4 py-2 rounded-full text-sm"
            >
              Order
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/products') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/about') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`${
                isActive('/contact') ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Contact
            </Link>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-4 py-2 rounded-full text-base mx-3 text-center"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
