import { useState } from 'react'
import restaurant1 from '../../assets/restaurant1.png'
import restaurant2 from '../../assets/restaurant2.png'
import menuSectionImage from '../../assets/menu-section.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Luxurious Contact Header - Purple Background */}
      <div className="relative overflow-hidden bg-[#301934] py-20 md:py-24">
        {/* Premium Background Elements */}
        <div className="absolute top-0 left-0 w-[800px] h-[400px] bg-gradient-to-br from-white/8 via-purple-300/6 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gradient-to-tl from-white/6 via-yellow-200/8 to-transparent rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
        
        {/* Elegant Glowing Rings */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-white/15 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/5 right-2/5 w-32 h-32 border border-yellow-300/25 rounded-full animate-pulse delay-2000"></div>
        
        {/* Floating Light Particles */}
        <div className="absolute top-1/6 right-1/5 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/6 w-1.5 h-1.5 bg-yellow-300/50 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-2500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Clean Text Space */}
            <div className="text-center lg:text-left space-y-8">
              {/* Premium Status Badge */}
              <div className="inline-flex items-center bg-white/95 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full shadow-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg"></div>
                <span className="text-[#301934] font-bold text-sm tracking-wider uppercase">Available Now</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-none">
                  GET IN
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-white bg-clip-text text-transparent tracking-tight leading-none">
                  TOUCH
                </h2>
              </div>
              
              {/* Elegant Divider */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-white/20"></div>
                <div className="w-2 h-2 bg-yellow-300 rounded-full mx-6 shadow-lg"></div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/40 to-white/20"></div>
              </div>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl">
                Connect with us for premium products, exceptional service, and everything you need for your daily essentials
              </p>
              
              {/* Soft Light Reflection */}
              <div className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-white/40 via-yellow-300/20 to-transparent transform -translate-y-1/2 blur-sm"></div>
            </div>
            
            {/* Right Side - Premium 3D Contact Icons */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Container with Soft Glow */}
              <div className="relative">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-white/20 via-yellow-300/8 to-transparent rounded-full scale-150 blur-2xl"></div>
                
                {/* Floating Contact Icons Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  
                  {/* Phone Icon - Top */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <div className="relative group">
                      {/* Icon Shadow */}
                      <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                      {/* Icon Container */}
                      <div className="relative bg-white/95 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        {/* Floating Label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-[#301934] px-3 py-1 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Call Us
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Icon - Bottom Left */}
                  <div className="absolute bottom-8 left-8">
                    <div className="relative group">
                      {/* Icon Shadow */}
                      <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                      {/* Icon Container */}
                      <div className="relative bg-white/95 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {/* Floating Label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-[#301934] px-3 py-1 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Email
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Icon - Bottom Right */}
                  <div className="absolute bottom-8 right-8">
                    <div className="relative group">
                      {/* Icon Shadow */}
                      <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                      {/* Icon Container */}
                      <div className="relative bg-white/95 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        {/* Floating Label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-[#301934] px-3 py-1 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Visit Us
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Central Connecting Lines */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-1 h-1 bg-yellow-300/40 rounded-full"></div>
                    {/* Connecting Lines */}
                    <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-white/30 to-transparent transform -rotate-45 origin-left"></div>
                    <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-white/30 to-transparent transform rotate-45 origin-left"></div>
                    <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-white/30 to-transparent transform -rotate-90 origin-left"></div>
                  </div>
                </div>
                
                {/* Elegant Curved Accents */}
                <div className="absolute -top-8 -right-8 w-24 h-24 border border-white/15 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 border border-yellow-300/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seamless Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
      </div>

      {/* Main Split-Screen Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - High-Quality Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main Visual Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Enhanced Store Image */}
              <div className="relative h-[500px] lg:h-[600px]">
                <img 
                  src={restaurant1} 
                  alt="The Golden Rose Store" 
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: 'center 40%',
                    filter: 'contrast(1.1) brightness(1.05) saturate(1.05)'
                  }}
                />
                
                {/* Purple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#301934]/20 via-transparent to-white/30"></div>
                
                {/* Floating info card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#301934] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#301934] text-lg">Visit Our Store</h3>
                      <p className="text-gray-600 text-sm">8 High Street, Newhaven BN9 9PE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={restaurant2} 
                  alt="Store Interior" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                />
                <div className="absolute inset-0 bg-[#301934]/10"></div>
              </div>
              <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={menuSectionImage} 
                  alt="Our Products" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                />
                <div className="absolute inset-0 bg-[#301934]/10"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form & Details */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Contact Information Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#301934] mb-8">Contact Information</h2>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#301934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#301934] mb-1">Address</h3>
                    <p className="text-gray-600">8 High Street</p>
                    <p className="text-gray-600">Newhaven, BN9 9PE</p>
                    <p className="text-gray-600">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#301934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#301934] mb-1">Phone</h3>
                    <a href="tel:+447396890670" className="text-[#301934] hover:text-purple-700 font-medium">
                      +44 7396 890670
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#301934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#301934] mb-1">Email</h3>
                    <a href="mailto:thegoldenrose1952@gmail.com" className="text-[#301934] hover:text-purple-700 font-medium break-all">
                      thegoldenrose1952@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#301934]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#301934] mb-3">Opening Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-semibold text-[#301934]">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-semibold text-[#301934]">9:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-semibold text-[#301934]">10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <a
                  href="tel:+447396890670"
                  className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-all duration-300 border-2 border-purple-100 hover:border-[#301934]/30"
                >
                  <svg className="w-8 h-8 text-[#301934] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-bold text-[#301934] text-sm">Call Us</span>
                </a>

                <a
                  href="https://wa.me/447396890670"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-all duration-300 border-2 border-purple-100 hover:border-[#301934]/30"
                >
                  <svg className="w-8 h-8 text-[#301934] mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-bold text-[#301934] text-sm">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Simple Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#301934] mb-6">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#301934] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#301934] focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#301934] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#301934] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#301934] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#301934] focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#301934] hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.8!2d0.0547!3d50.7947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df7321a0000001%3A0x1!2s8%20High%20St%2C%20Newhaven%20BN9%209PE%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Golden Rose Location"
                ></iframe>
              </div>
              <div className="p-6">
                <a
                  href="https://www.google.com/maps/dir//8+High+St,+Newhaven+BN9+9PE,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-[#301934] hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
