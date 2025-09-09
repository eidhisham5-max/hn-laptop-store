import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have vanished into the digital void. 
          Don&apos;t worry, our laptops are still here and ready to serve you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🏠 Back to Home
          </Link>
          
          <Link 
            href="/#products"
            className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200"
          >
            🛍️ Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link 
              href="/brands/dell" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Dell Laptops
            </Link>
            <Link 
              href="/brands/hp" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              HP Laptops
            </Link>
            <Link 
              href="/brands/lenovo" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Lenovo Laptops
            </Link>
            <Link 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Need help? Contact us on WhatsApp: 
            <a 
              href="https://wa.me/201000000000" 
              className="text-blue-600 hover:text-blue-800 font-medium ml-1"
            >
              +20 100 000 0000
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}