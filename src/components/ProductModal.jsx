import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id)
    
    if (existingItemIndex > -1) {
      // Update quantity if exists
      existingCart[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      existingCart.push({ ...product, quantity })
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'))
    
    // Show success message
    alert(`Added ${quantity}x ${product.name} to cart!`)
    onClose()
  }

  const handleBuyNow = () => {
    // Add to cart first
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id)
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity
    } else {
      existingCart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    window.dispatchEvent(new Event('cartUpdated'))
    
    // Navigate to checkout
    navigate('/checkout')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-[650px] shadow-2xl transform transition-all animate-scaleIn relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-all z-10"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image - Centered with padding */}
        <div className="p-5 pb-2 bg-white">
          <div className="relative h-44 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
              style={{ maxWidth: '55%', margin: '0 auto' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
              }}
            />
            {product.badge && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-md">
                {product.badge}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="px-5 pb-5">
          {/* Category Badge */}
          <span className="inline-block bg-purple-50 text-[#301934] px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-2 border border-purple-100">
            {product.category}
          </span>

          {/* Product Name & Price Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="text-lg font-bold text-gray-900 leading-tight flex-1">
              {product.name}
            </h2>
            <p className="text-xl font-bold text-[#301934] whitespace-nowrap">
              £{product.price.toFixed(2)}
            </p>
          </div>

          {/* Size */}
          {product.size && (
            <p className="text-gray-600 text-xs mb-2">{product.size}</p>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 text-xs leading-relaxed mb-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-3 bg-gray-50 rounded-lg px-2.5 py-1 inline-flex">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 text-[10px] font-semibold">{product.rating}</span>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-800 mb-1.5">
              Quantity
            </label>
            <div className="flex items-center gap-2.5 bg-gray-50 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 flex items-center justify-center font-bold text-gray-700 hover:text-[#301934] transition-all shadow-sm border border-gray-200 text-sm"
              >
                −
              </button>
              <span className="text-base font-bold text-gray-900 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 flex items-center justify-center font-bold text-gray-700 hover:text-[#301934] transition-all shadow-sm border border-gray-200 text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleAddToCart}
              className="bg-white border-2 border-[#301934] text-[#301934] font-semibold py-2.5 px-3 rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#301934] text-white font-semibold py-2.5 px-3 rounded-lg hover:bg-[#4a2e58] transition-all duration-200 shadow-md text-xs"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
