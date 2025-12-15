import { useState } from 'react'
import { phrases } from '../data/kannadaData'

function Phrases() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Everyday Greetings</h2>
        <p className="text-sm sm:text-base text-gray-600">Learn common Kannada phrases for daily conversations</p>
      </div>
      <div className="grid gap-3 sm:gap-4">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md active:scale-98 border border-gray-200"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 break-words">
                  {phrase.kannada}
                </div>
                <div className="text-base sm:text-lg text-gray-600 italic mb-2">
                  {phrase.transliteration}
                </div>
                {expandedIndex === index && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="text-lg sm:text-xl font-semibold text-gray-900">
                      {phrase.english}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-2 capitalize">
                      Category: {phrase.category}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-gray-400 text-xl sm:text-2xl flex-shrink-0">
                {expandedIndex === index ? '▲' : '▼'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Phrases

