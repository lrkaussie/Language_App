import { useState, useEffect } from 'react'
import { vocabulary } from '../data/kannadaData'

function Progress() {
  const [learnedWords, setLearnedWords] = useState(() => {
    const saved = localStorage.getItem('learnedWords')
    return saved ? JSON.parse(saved) : []
  })

  const totalWords = vocabulary.length
  const learnedCount = learnedWords.length
  const progressPercentage = (learnedCount / totalWords) * 100

  const categoryProgress = {}
  vocabulary.forEach(word => {
    if (!categoryProgress[word.category]) {
      categoryProgress[word.category] = { total: 0, learned: 0 }
    }
    categoryProgress[word.category].total++
    if (learnedWords.includes(word.kannada)) {
      categoryProgress[word.category].learned++
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your learning journey in Kannada</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Words Learned</span>
            <span className="text-2xl font-bold text-blue-600">
              {learnedCount} / {totalWords}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <p className="text-gray-600">
          {progressPercentage.toFixed(1)}% Complete
        </p>
      </div>

      {/* Category Progress */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Progress by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryProgress).map(([category, stats]) => {
            const categoryPercentage = (stats.learned / stats.total) * 100
            return (
              <div key={category} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900 capitalize">
                    {category}
                  </span>
                  <span className="text-blue-600 font-bold">
                    {stats.learned} / {stats.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${categoryPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {categoryPercentage.toFixed(0)}% complete
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        {learnedWords.length > 0 ? (
          <div className="space-y-2">
            <p className="text-gray-600">
              You've learned {learnedWords.length} word{learnedWords.length !== 1 ? 's' : ''} so far!
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {learnedWords.slice(-10).map((word, index) => {
                const wordData = vocabulary.find(w => w.kannada === word)
                return (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {wordData?.english || word}
                  </span>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Start learning to see your progress here!</p>
        )}
      </div>
    </div>
  )
}

export default Progress

