import { useState } from 'react'
import { menuItems, categories } from '../data/menuItems'
import ProductModal from '../components/ProductModal'
import menuSectionImage from '../../assets/menu-section.png'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Luxurious Menu Banner - Purple Background */}
      <div className="relative overflow-hidden bg-[#301934]">
        {/* Subtle white/light purple vignette and edge accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-300/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-32 bg-white/4 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        {/* Floating micro particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-200/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Minimal Typography */}
            <div className="text-center lg:text-left space-y-8">
              {/* Main Brand Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none">
                  THE GOLDEN ROSE
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-300 tracking-tight leading-none">
                  MENU
                </h2>
              </div>
              
              {/* Elegant divider */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-px w-16 bg-white/30"></div>
                <div className="w-1 h-1 bg-yellow-300 rounded-full mx-4"></div>
                <div className="h-px w-16 bg-white/30"></div>
              </div>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                Fresh <span className="text-yellow-300">•</span> Premium <span className="text-yellow-300">•</span> Daily Essentials
              </p>
              
              {/* Clean light streaks */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 w-24 h-px bg-gradient-to-r from-white/20 to-transparent transform -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-24 h-px bg-gradient-to-l from-white/20 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
              </div>
            </div>
            
            {/* Right Side - Premium Product Showcase */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Soft white vignette behind products */}
              <div className="absolute inset-0 bg-gradient-radial from-white/12 via-white/6 to-transparent rounded-full scale-110 blur-xl"></div>
              
              {/* Studio lighting effect */}
              <div className="absolute top-0 left-1/2 w-96 h-48 bg-white/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/4"></div>
              
              {/* Main product container */}
              <div className="relative max-w-lg">
                {/* Enhanced product image */}
                <img
                  src={menuSectionImage}
                  alt="The Golden Rose Premium Products"
                  className="w-full h-auto object-contain relative z-10"
                  style={{
                    filter: 'contrast(1.15) brightness(1.1) saturate(1.05)',
                    dropShadow: '0 25px 50px rgba(48, 25, 52, 0.15)',
                  }}
                />
                
                {/* Soft floating glow around sweets */}
                <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-300/40 rounded-full blur-lg animate-pulse delay-500"></div>
                <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-pink-300/35 rounded-full blur-md animate-pulse delay-1500"></div>
                <div className="absolute top-1/2 left-1/6 w-4 h-4 bg-white/30 rounded-full blur-sm animate-pulse delay-2500"></div>
                
                {/* Subtle reflection */}
                <div className="absolute bottom-0 left-1/2 w-3/4 h-8 bg-gradient-to-t from-white/15 to-transparent rounded-full blur-sm transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              {/* Elegant curved accent */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-white/15 rounded-full"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 border border-white/12 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Seamless bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-[1200px] mx-auto px-5 py-4">
          {/* Category Navigation */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#301934] text-white font-bold shadow-md'
                      : 'bg-gray-100 text-gray-700 font-medium hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-75"
            >
              {/* Product Image - No Box */}
              <div className="relative w-full max-w-[160px] mx-auto aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop'
                  }}
                />
                {item.badge && (
                  <div className="absolute top-1 right-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-md">
                    {item.badge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-2">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default Menu
