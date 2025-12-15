import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Progress from './components/Progress'
import Flashcards from './components/Flashcards'
import Phrases from './components/Phrases'
import Quiz from './components/Quiz'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation */}
          <TopNav currentView={currentView} setCurrentView={setCurrentView} />

          {/* Main Content Area */}
          <div className="px-8 py-6">
            {currentView === 'dashboard' && <Flashcards />}
            {currentView === 'progress' && <Progress />}
          </div>
        </div>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg cursor-pointer hover:bg-blue-600 transition-colors">
        🏠
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg cursor-pointer hover:bg-blue-600 transition-colors">
        📚
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg cursor-pointer hover:bg-blue-600 transition-colors">
        📊
      </div>
    </div>
  )
}

function TopNav({ currentView, setCurrentView }) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
            🐢
          </div>
          <span className="text-xl font-bold text-gray-900">TalkTurtle</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              currentView === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              currentView === 'progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Progress
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Profile</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
