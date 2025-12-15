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
    <div className="space-y-8">
      {/* Main Learning Section */}
      <div className="bg-gray-100 rounded-xl p-8">
        <div className="text-sm text-gray-600 mb-2">Learning</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          IN <span className="text-blue-600">Kannada</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl">
          Master Kannada through immersive lessons, real-world conversations, and personalized learning paths designed to take you from beginner to fluent.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => onLessonClick('flashcards')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Continue Lesson
            <span>→</span>
          </button>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200">
            View Curriculum
          </button>
        </div>
      </div>

      {/* Your Learning Path */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Path</h2>
        <p className="text-gray-600 mb-6">Structured lessons to build your Kannada fluency.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer relative"
    >
      {lesson.completed && (
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
          Completed
        </div>
      )}
      <div className="text-4xl mb-4">{lesson.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{lesson.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{lesson.subtitle}</p>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          {lesson.level}
        </span>
        <span>{lesson.duration}</span>
      </div>
    </div>
  )
}

export default Dashboard

