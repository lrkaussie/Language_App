import { useState } from 'react'

function Dashboard({ onLessonClick }) {
  const lessons = [
    {
      id: 'vowels',
      title: 'Kannada Vowels & Consonants',
      subtitle: 'Unit 1',
      level: 'Beginner',
      duration: '12 min',
      icon: '📖',
      completed: false
    },
    {
      id: 'greetings',
      title: 'Everyday Greetings',
      subtitle: 'Unit 1',
      level: 'Beginner',
      duration: '15 min',
      icon: '👥',
      completed: true,
      lessonType: 'phrases'
    },
    {
      id: 'listening',
      title: 'Listening: Introduction',
      subtitle: 'Unit 2',
      level: 'Beginner',
      duration: '10 min',
      icon: '🎧',
      completed: true,
      lessonType: 'quiz'
    },
    {
      id: 'vocabulary',
      title: 'Essential Vocabulary',
      subtitle: 'Unit 2',
      level: 'Beginner',
      duration: '20 min',
      icon: '📚',
      completed: false,
      lessonType: 'flashcards'
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Learning Section - Responsive padding and text */}
      <div className="bg-gray-100 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="text-xs sm:text-sm text-gray-600 mb-2">Learning</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          IN <span className="text-blue-600">Kannada</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl">
          Master Kannada through immersive lessons, real-world conversations, and personalized learning paths designed to take you from beginner to fluent.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => onLessonClick('flashcards')}
            className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            Continue Lesson
            <span>→</span>
          </button>
          <button className="bg-white text-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200 text-sm sm:text-base whitespace-nowrap">
            View Curriculum
          </button>
        </div>
      </div>

      {/* Your Learning Path - Responsive grid */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Learning Path</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Structured lessons to build your Kannada fluency.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onClick={() => lesson.lessonType && onLessonClick(lesson.lessonType)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonCard({ lesson, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer relative active:scale-95 transition-transform"
    >
      {lesson.completed && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gray-100 text-gray-600 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
          Completed
        </div>
      )}
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{lesson.icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 pr-16 sm:pr-0">{lesson.title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{lesson.subtitle}</p>
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
        <span className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 rounded-full font-medium">
          {lesson.level}
        </span>
        <span>{lesson.duration}</span>
      </div>
    </div>
  )
}

export default Dashboard

