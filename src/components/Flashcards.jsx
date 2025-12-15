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
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Header Section - Responsive text */}
      <div className="mb-4 sm:mb-8">
        <div className="text-xs sm:text-sm text-gray-600 mb-2">Learning</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          IN <span className="text-blue-600">Kannada</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Master Kannada through interactive flashcards. Tap to flip and learn!
        </p>
      </div>

      {/* Category Filter - Responsive with horizontal scroll on mobile */}
      <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat)
              setCurrentIndex(0)
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              category === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Flashcard - Responsive sizing and padding */}
      <div className="relative">
        <div
          className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex items-center justify-center cursor-pointer transform transition-all hover:shadow-xl border border-gray-200 active:scale-98"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center w-full">
            {!isFlipped ? (
              <>
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-blue-600 mb-4 sm:mb-6">
                  {currentWord.kannada}
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 italic mb-2">
                  {currentWord.transliteration}
                </div>
                {currentWord.pronunciation && (
                  <div className="text-sm sm:text-base lg:text-lg text-green-600 font-mono mb-2">
                    🔊 {currentWord.pronunciation}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">Tap to reveal meaning</p>
              </>
            ) : (
              <>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {currentWord.english}
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-500 mb-2">
                  {currentWord.transliteration}
                </div>
                {currentWord.pronunciation && (
                  <div className="text-sm sm:text-base text-green-600 font-mono mb-2">
                    🔊 {currentWord.pronunciation}
                  </div>
                )}
                <div className="text-2xl sm:text-3xl lg:text-4xl text-blue-600 mt-4 sm:mt-6 mb-3 sm:mb-4">
                  {currentWord.kannada}
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">Tap to flip back</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Responsive layout */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={handlePrev}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm active:scale-95 whitespace-nowrap"
        >
          ← Previous
        </button>
        <button
          onClick={markLearned}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-sm active:scale-95 whitespace-nowrap ${
            learnedWords.includes(currentWord.kannada)
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {learnedWords.includes(currentWord.kannada) ? '✓ Learned' : 'Mark Learned'}
        </button>
        <button
          onClick={handleNext}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm active:scale-95 whitespace-nowrap"
        >
          Next →
        </button>
      </div>

      {/* Progress Info - Responsive text */}
      <div className="text-center text-xs sm:text-sm text-gray-600">
        <span className="font-medium">{currentIndex + 1} of {filteredVocab.length} words</span>
        {learnedWords.length > 0 && (
          <span className="ml-2 sm:ml-4 text-green-600 font-medium">
            • {learnedWords.length} learned
          </span>
        )}
      </div>
    </div>
  )
}

export default Flashcards

