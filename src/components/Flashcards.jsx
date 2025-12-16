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
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasKannadaVoice, setHasKannadaVoice] = useState(null) // null = checking, true/false = result

  const filteredVocab = category === 'all' 
    ? vocabulary 
    : vocabulary.filter(word => word.category === category)

  const currentWord = filteredVocab[currentIndex]

  useEffect(() => {
    setIsFlipped(false)
  }, [currentIndex, category])

  // Check for Kannada voice availability on mount
  useEffect(() => {
    const checkKannadaVoice = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices()
        const kannadaAvailable = voices.some(voice => voice.lang.startsWith('kn'))
        setHasKannadaVoice(kannadaAvailable)
        console.log('🔍 Kannada voice available:', kannadaAvailable)
      } else {
        setHasKannadaVoice(false)
      }
    }

    // Voices might not be loaded immediately
    checkKannadaVoice()
    
    // Some browsers need this event
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = checkKannadaVoice
    }
  }, [])

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

  // Web Speech API function with fallback
  const speakWord = (e) => {
    e.stopPropagation() // Prevent card flip when clicking audio button
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices()
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`))
      
      // Try to find a Kannada voice
      const kannadaVoice = voices.find(voice => voice.lang.startsWith('kn'))
      
      let textToSpeak = currentWord.kannada
      let language = 'kn-IN'
      
      // Fallback: If no Kannada voice, use transliteration with English voice
      if (!kannadaVoice) {
        console.log('No Kannada voice found. Using transliteration as fallback.')
        textToSpeak = currentWord.transliteration
        language = 'en-US'
      } else {
        console.log('Using Kannada voice:', kannadaVoice.name)
      }
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = language
      utterance.rate = 0.5 // Much slower - clearer for hearing
      utterance.pitch = 1.0
      utterance.volume = 1.0 // Maximum volume
      
      if (kannadaVoice) {
        utterance.voice = kannadaVoice
      }
      
      // Add event listeners with visual feedback
      utterance.onstart = () => {
        console.log('Speech started:', textToSpeak)
        setIsSpeaking(true)
      }
      utterance.onend = () => {
        console.log('Speech ended')
        setIsSpeaking(false)
      }
      utterance.onerror = (e) => {
        console.error('Speech error:', e)
        setIsSpeaking(false)
        alert(`Speech error: ${e.error}. Please check your system audio.`)
      }
      
      window.speechSynthesis.speak(utterance)
      
      // Show what's being spoken
      if (!kannadaVoice) {
        console.log(`🔊 Playing in ENGLISH: "${textToSpeak}" (no Kannada voice available)`)
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech.')
    }
  }

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
        
        {/* Audio Mode Notice */}
        {hasKannadaVoice === false && (
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📢</span>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Audio Mode: Transliteration</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Kannada text-to-speech is not available on your system. Audio will play English pronunciation of the transliteration.
                </p>
                <details className="text-xs text-blue-700">
                  <summary className="cursor-pointer hover:text-blue-900 font-medium">
                    💡 How to enable native Kannada audio
                  </summary>
                  <div className="mt-2 space-y-1 pl-4 border-l-2 border-blue-300">
                    <p><strong>Windows:</strong> Settings → Time & Language → Language → Add Kannada → Install Text-to-Speech</p>
                    <p><strong>Mac:</strong> System Preferences → Accessibility → Spoken Content → System Voice → Manage Voices → Download Kannada</p>
                    <p><strong>Android/iOS:</strong> Usually has Kannada voices pre-installed</p>
                    <p className="mt-2 text-blue-600">⚠️ Note: Some Windows versions don't support Kannada TTS. In that case, use pronunciation hints above each word!</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        )}
        
        {hasKannadaVoice === true && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <span className="text-xl">✅</span>
            <p className="text-sm text-green-800">
              <strong>Native Kannada audio enabled!</strong> You'll hear authentic pronunciation.
            </p>
          </div>
        )}
      </div>

      {/* Category Filter - Responsive with horizontal scroll on mobile */}
      <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat)
              setCurrentIndex(0)
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
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
                <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 italic mb-4">
                  {currentWord.transliteration}
                </div>
                
                {/* Pronunciation Hint - More Prominent */}
                {currentWord.pronunciation && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-100">
                    <div className="text-xs sm:text-sm text-gray-600 mb-1 uppercase tracking-wide">
                      Pronunciation Guide
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl text-blue-800 font-bold tracking-wider">
                      {currentWord.pronunciation}
                    </div>
                  </div>
                )}
                
                {/* Audio Button with Mode Indicator */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={speakWord}
                    disabled={isSpeaking}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 flex items-center gap-2 shadow-md ${
                      isSpeaking 
                        ? 'bg-green-600 text-white animate-pulse' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    title={hasKannadaVoice === false ? 'Playing transliteration (Kannada voice not available)' : 'Listen to pronunciation'}
                  >
                    {isSpeaking ? '🔊 Playing...' : '🔊 Listen'}
                  </button>
                  
                  {/* Audio Mode Badge */}
                  {hasKannadaVoice === false && (
                    <div className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full border border-yellow-200">
                      <span>📝</span>
                      <span className="font-medium">Transliteration Mode</span>
                    </div>
                  )}
                  {hasKannadaVoice === true && (
                    <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
                      <span>✓</span>
                      <span className="font-medium">Native Audio</span>
                    </div>
                  )}
                </div>
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

