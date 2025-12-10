import restaurant1 from '../../assets/restaurant1.png'
import restaurant2 from '../../assets/restaurant2.png'
import restaurant3 from '../../assets/restaurant3.jpeg'
import logo from '../../assets/Logo.png'

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Parallax Effect */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src={restaurant1}
                        alt="The Golden Rose"
                        className="w-full h-full object-cover"
                    />

                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="text-center">
                        <div className="inline-block mb-8 animate-pulse">
                            <img src={logo} alt="The Golden Rose" className="h-24 w-24 md:h-32 md:w-32 mx-auto drop-shadow-2xl" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Our Story
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            A legacy of love, family, and tradition that began with a dream
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Story Section - Premium Design */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="relative h-96 lg:h-auto overflow-hidden">
                            <img
                                src={restaurant2}
                                alt="Inside The Golden Rose"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                    <p className="text-white text-lg font-semibold mb-2">Established</p>
                                    <p className="text-yellow-400 text-4xl font-bold">2022</p>
                                    <p className="text-gray-200 mt-2">Honoring a 70-year legacy</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                                <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Our Legacy</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                A Mother's Dream <br />
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    Come True
                                </span>
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                The Golden Rose was created to honour our mother's dream of opening a café.
                                What was once just an idea is now a reality, serving the Newhaven community
                                with the same warmth and love she always envisioned.
                            </p>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Some recipes date back to <span className="font-bold text-orange-600">1952</span>,
                                the year she was born. Every product we serve carries forward her passion for
                                quality, tradition, and bringing people together.
                            </p>

                            {/* Memorial Card - Premium Design */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur opacity-25"></div>
                                <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-600 text-sm font-semibold mb-1 uppercase tracking-wide">In Loving Memory</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">Rosemary Jennings</h3>
                                            <p className="text-orange-600 font-semibold text-lg mb-2">1952 - 2022</p>
                                            <p className="text-gray-600 italic">"Her dream lives on in every product we serve"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section - Modern Cards */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">What We Stand For</span>
                            <div className="h-1 w-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built on the foundation of family, tradition, and community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value Card 1 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Family Legacy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Every recipe and tradition honors our mother's vision and the love she poured into her dream of bringing people together.
                                </p>
                            </div>
                        </div>

                        {/* Value Card 2 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Time-Honored Recipes</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Authentic recipes dating back to 1952, passed down through generations with care, love, and unwavering dedication.
                                </p>
                            </div>
                        </div>

                        {/* Value Card 3 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Community First</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Serving the Newhaven community with the same warmth, care, and genuine hospitality our mother always showed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Section - Premium Design */}
            <div className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Our Journey</span>
                            <div className="h-1 w-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">From Dream to Reality</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-green-500 hidden md:block"></div>

                        <div className="space-y-12">
                            {/* Timeline Item 1 */}
                            <div className="relative flex gap-8 items-start">
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                                        1952
                                    </div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">The Beginning</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Rosemary Jennings was born, and with her, the seeds of a dream that would one day blossom into The Golden Rose.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 2 */}
                            <div className="relative flex gap-8 items-start">
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">The Dream</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Throughout her life, Rosemary dreamed of opening a café where she could share her love of food, family, and community with others.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="relative flex gap-8 items-start">
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                                        2022
                                    </div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">A Legacy Honored</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        After Rosemary's passing, her family committed to making her dream a reality, preserving her cherished recipes and heartfelt vision.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 4 */}
                            <div className="relative flex gap-8 items-start">
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Today - The Golden Rose</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Now open and thriving, serving the Newhaven community with pride, keeping Rosemary's dream alive with every product we offer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Section */}
            <div className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-6">
                            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-orange-100">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Virtual Tour</span>
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Our Store</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Experience the warmth and quality of The Golden Rose from the comfort of your home
                        </p>
                    </div>

                    {/* Video Container */}
                    <div className="relative max-w-6xl mx-auto">
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-orange-300 to-red-400 rounded-full blur-3xl opacity-10"></div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-pink-300 to-red-400 rounded-full blur-3xl opacity-10"></div>

                        {/* Video Card */}
                        <div className="relative">
                            {/* Main Card */}
                            <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 transform hover:scale-[1.01] transition-transform duration-300">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                        playsInline
                                    >
                                        <source src="/assets/openart-video_b723f574_1765341886773.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                {/* Video Details */}
                                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={logo} alt="The Golden Rose" className="w-12 h-12 rounded-full border-2 border-orange-200 shadow-md" />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">The Golden Rose</h3>
                                            <p className="text-sm text-gray-500">8 High St, Newhaven BN9 9PE</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-semibold">4.8</span>
                                        </div>
                                        <a
                                            href="/contact"
                                            className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                        >
                                            Get Directions →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Info Cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Opening Hours</h4>
                            <p className="text-sm text-gray-600">Mon-Sat: 9AM-9PM<br />Sun: 10AM-6PM</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Quality Products</h4>
                            <p className="text-sm text-gray-600">Fresh essentials & everyday items</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Friendly Service</h4>
                            <p className="text-sm text-gray-600">Serving the Newhaven community</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Image Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={restaurant1}
                    alt="The Golden Rose Restaurant"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                            Welcome to <span className="text-yellow-400">Our Home</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-200">
                            Where every customer is treated like family
                        </p>
                    </div>
                </div>
            </div>

            {/* Store Image Gallery */}
            <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
                        <p className="text-gray-600 text-sm">Experience the warmth of The Golden Rose</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="relative h-72 rounded-xl overflow-hidden shadow-md group">
                            <img 
                                src={restaurant1} 
                                alt="The Golden Rose Store" 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                style={{ objectPosition: 'center 40%' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="font-semibold text-sm">Store Front</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-72 rounded-xl overflow-hidden shadow-md group">
                            <img 
                                src={restaurant2} 
                                alt="Inside The Golden Rose" 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                style={{ objectPosition: 'center 40%' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="font-semibold text-sm">Inside View</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-72 rounded-xl overflow-hidden shadow-md group">
                            <img 
                                src={restaurant3} 
                                alt="The Golden Rose Products" 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                style={{ objectPosition: 'center 50%' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="font-semibold text-sm">Our Products</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02ek02IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Experience the Legacy
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 text-yellow-100">
                        Visit us today and taste the tradition that Rosemary always envisioned
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/products"
                            className="inline-flex items-center justify-center bg-white text-orange-600 font-bold px-10 py-5 rounded-full text-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            View Our Menu
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-10 py-5 rounded-full text-lg transition-all duration-300 border-2 border-white/50 shadow-2xl"
                        >
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
