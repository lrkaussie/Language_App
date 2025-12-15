import { useState } from 'react'
import { phrases } from '../data/kannadaData'

function Phrases() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Everyday Greetings</h2>
        <p className="text-gray-600">Learn common Kannada phrases for daily conversations</p>
      </div>
      <div className="grid gap-4">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md border border-gray-200"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {phrase.kannada}
                </div>
                <div className="text-lg text-gray-600 italic mb-2">
                  {phrase.transliteration}
                </div>
                {expandedIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xl font-semibold text-gray-900">
                      {phrase.english}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 capitalize">
                      Category: {phrase.category}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-gray-400 text-2xl ml-4">
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

