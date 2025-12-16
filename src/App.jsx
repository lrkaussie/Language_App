import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Progress from './components/Progress'
import Flashcards from './components/Flashcards'
import Phrases from './components/Phrases'
import Quiz from './components/Quiz'
import Footer from './components/Footer'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Left Sidebar - Hidden on mobile */}
        <Sidebar className="hidden md:flex" />

        {/* Main Content */}
        <div className="flex-1 w-full flex flex-col">
          {/* Top Navigation */}
          <TopNav 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* Main Content Area - Responsive padding */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {currentView === 'dashboard' && <Flashcards />}
            {currentView === 'progress' && <Progress />}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

function Sidebar({ className = '' }) {
  return (
    <div className={`w-16 bg-white border-r border-gray-200 flex-col items-center py-4 gap-4 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all">
        🏠
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all">
        📚
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all">
        📊
      </div>
    </div>
  )
}

function TopNav({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-sm">
            🐢
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900">TalkTurtle</span>
        </div>

        {/* Navigation Tabs - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
              currentView === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
              currentView === 'progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Progress
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right Side - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Profile</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 pb-3 space-y-2">
          <button
            onClick={() => {
              setCurrentView('dashboard')
              setMobileMenuOpen(false)
            }}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
              currentView === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('progress')
              setMobileMenuOpen(false)
            }}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
              currentView === 'progress'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Progress
          </button>
        </div>
      )}
    </div>
  )
}

export default App
