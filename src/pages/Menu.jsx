import { useState } from 'react'
import { menuItems, categories } from '../data/menuItems'
import ProductModal from '../components/ProductModal'

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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-[1200px] mx-auto px-5 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Our Menu</h1>
          <p className="text-gray-600 text-xs mb-4">Discover our selection of quality products</p>
          
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
