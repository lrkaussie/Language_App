import { useState, useEffect } from 'react'
import { vocabulary } from '../data/kannadaData'

function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedWords, setLearnedWords] = useState(() => {
    const saved = localStorage.getItem('learnedWords')
    return saved ? JSON.parse(saved) : []
  })
  const [category, setCategory] = useState('all')

  const filteredVocab = category === 'all' 
    ? vocabulary 
    : vocabulary.filter(word => word.category === category)

  const currentWord = filteredVocab[currentIndex]

  useEffect(() => {
    setIsFlipped(false)
  }, [currentIndex, category])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVocab.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length)
  }

  const markLearned = () => {
    if (currentWord && !learnedWords.includes(currentWord.kannada)) {
      const newLearned = [...learnedWords, currentWord.kannada]
      setLearnedWords(newLearned)
      localStorage.setItem('learnedWords', JSON.stringify(newLearned))
    }
  }

  const categories = ['all', ...new Set(vocabulary.map(w => w.category))]

  if (!currentWord) {
    return (
      <div className="text-center text-gray-600">
        No words in this category yet.
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-sm text-gray-600 mb-2">Learning</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          IN <span className="text-blue-600">Kannada</span>
        </h1>
        <p className="text-gray-600">
          Master Kannada through interactive flashcards. Click to flip and learn!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat)
              setCurrentIndex(0)
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              category === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      <div className="relative">
        <div
          className="bg-white rounded-xl shadow-lg p-12 min-h-[400px] flex items-center justify-center cursor-pointer transform transition-all hover:shadow-xl border border-gray-200"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center w-full">
            {!isFlipped ? (
              <>
                <div className="text-7xl font-bold text-blue-600 mb-6">
                  {currentWord.kannada}
                </div>
                <div className="text-2xl text-gray-600 italic mb-2">
                  {currentWord.transliteration}
                </div>
                {currentWord.pronunciation && (
                  <div className="text-lg text-green-600 font-mono mb-2">
                    🔊 {currentWord.pronunciation}
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-6">Click to reveal meaning</p>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-gray-900 mb-6">
                  {currentWord.english}
                </div>
                <div className="text-xl text-gray-500 mb-2">
                  {currentWord.transliteration}
                </div>
                {currentWord.pronunciation && (
                  <div className="text-base text-green-600 font-mono mb-2">
                    🔊 {currentWord.pronunciation}
                  </div>
                )}
                <div className="text-4xl text-blue-600 mt-6 mb-4">
                  {currentWord.kannada}
                </div>
                <p className="text-sm text-gray-400 mt-4">Click to flip back</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrev}
          className="px-6 py-3 bg-white rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
        >
          ← Previous
        </button>
        <button
          onClick={markLearned}
          className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
            learnedWords.includes(currentWord.kannada)
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {learnedWords.includes(currentWord.kannada) ? '✓ Learned' : 'Mark Learned'}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-white rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
        >
          Next →
        </button>
      </div>

      {/* Progress Info */}
      <div className="text-center text-sm text-gray-600">
        <span className="font-medium">{currentIndex + 1} of {filteredVocab.length} words</span>
        {learnedWords.length > 0 && (
          <span className="ml-4 text-green-600 font-medium">
            • {learnedWords.length} learned
          </span>
        )}
      </div>
    </div>
  )
}

export default Flashcards

