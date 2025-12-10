import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#301934] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Slogan */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '0 4px 12px rgba(251, 191, 36, 0.4)' }}>
            Fresh Finds, Golden Taste.
          </h2>
          
          {/* Follow Us */}
          <p className="text-yellow-400 font-semibold text-lg mb-4">Follow Us</p>
          <div className="flex justify-center items-center mb-8">
            <a
              href="https://www.facebook.com/share/1SKshnZnyy/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-yellow-400 hover:text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Essential Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm">
          <Link to="/about" className="text-white/80 hover:text-yellow-400 transition-colors font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-yellow-400 transition-colors font-medium">
            Contact
          </Link>
          <a href="#" className="text-white/80 hover:text-yellow-400 transition-colors font-medium">
            Privacy Policy
          </a>
          <a href="#" className="text-white/80 hover:text-yellow-400 transition-colors font-medium">
            FAQs
          </a>
          <a href="#" className="text-white/80 hover:text-yellow-400 transition-colors font-medium">
            Careers
          </a>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="The Golden Rose" 
            className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400 shadow-lg" 
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-white/60 text-xs">
          <p>© {new Date().getFullYear()} The Golden Rose. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
