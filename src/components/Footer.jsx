function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - App info */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-base sm:text-lg">
              🐢
            </div>
            <div className="text-center sm:text-left">
              <span className="text-sm sm:text-base font-bold text-gray-900">TalkTurtle</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-2">Learn Kannada</span>
            </div>
          </div>

          {/* Right side - Credits */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm text-gray-600">
              Developed & Designed by{' '}
              <a
                href="https://www.buzzingbeetech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors underline decoration-blue-400 hover:decoration-blue-600"
              >
                Buzzing Bee Technology
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © {new Date().getFullYear()} TalkTurtle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

