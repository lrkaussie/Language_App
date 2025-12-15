import { useState, useEffect } from 'react'
import { vocabulary } from '../data/kannadaData'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)]
    const wrongAnswers = vocabulary
      .filter(w => w.kannada !== randomWord.kannada)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english)
    
    const answers = [randomWord.english, ...wrongAnswers]
      .sort(() => Math.random() - 0.5)

    setCurrentQuestion({
      kannada: randomWord.kannada,
      transliteration: randomWord.transliteration,
      pronunciation: randomWord.pronunciation,
      correctAnswer: randomWord.english,
      answers
    })
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
  }

  const handleAnswer = (answer) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    if (answer === currentQuestion.correctAnswer) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
    } else {
      setIsCorrect(false)
    }
  }

  const handleNext = () => {
    generateQuestion()
  }

  if (!currentQuestion) {
    return <div className="text-center text-gray-600">Loading question...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Listening: Introduction</h2>
        <p className="text-sm sm:text-base text-gray-600">Test your knowledge with interactive quizzes</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200">
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 sm:mb-4">
            {currentQuestion.kannada}
          </div>
          <div className="text-base sm:text-lg lg:text-xl text-gray-600 italic mb-2">
            {currentQuestion.transliteration}
          </div>
          {currentQuestion.pronunciation && (
            <div className="text-sm sm:text-base text-green-600 font-mono">
              🔊 {currentQuestion.pronunciation}
            </div>
          )}
        </div>

        <div className="text-center mb-4 sm:mb-6">
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            What does this word mean?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={showResult}
              className={`p-3 sm:p-4 rounded-lg font-semibold text-left text-sm sm:text-base transition-all active:scale-95 break-words ${
                showResult && answer === currentQuestion.correctAnswer
                  ? 'bg-green-500 text-white'
                  : showResult && answer === selectedAnswer && !isCorrect
                  ? 'bg-red-500 text-white'
                  : showResult
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              {answer}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="text-center">
            {isCorrect ? (
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
                ✓ Correct!
              </div>
            ) : (
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-4">
                ✗ Incorrect. The answer is: {currentQuestion.correctAnswer}
              </div>
            )}
            <button
              onClick={handleNext}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
            >
              Next Question →
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 text-center border border-gray-200">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Score: {score} / {totalQuestions}
        </div>
        {totalQuestions > 0 && (
          <div className="text-base sm:text-lg text-gray-600">
            {Math.round((score / totalQuestions) * 100)}% correct
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz

