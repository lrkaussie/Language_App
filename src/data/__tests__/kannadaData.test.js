import { describe, it, expect } from 'vitest'
import { vocabulary, categories, phrases } from '../kannadaData.js'

describe('Kannada Vocabulary Data', () => {
  describe('Vocabulary Structure', () => {
    it('should have exactly 1000 words', () => {
      expect(vocabulary.length).toBe(1000)
    })

    it('should be an array', () => {
      expect(Array.isArray(vocabulary)).toBe(true)
    })

    it('should not be empty', () => {
      expect(vocabulary.length).toBeGreaterThan(0)
    })
  })

  describe('Word Object Structure', () => {
    it('each word should have required fields', () => {
      vocabulary.forEach((word, index) => {
        expect(word, `Word at index ${index} is missing required fields`).toHaveProperty('kannada')
        expect(word, `Word at index ${index} is missing required fields`).toHaveProperty('transliteration')
        expect(word, `Word at index ${index} is missing required fields`).toHaveProperty('english')
        expect(word, `Word at index ${index} is missing required fields`).toHaveProperty('category')
      })
    })

    it('each word should have non-empty kannada field', () => {
      vocabulary.forEach((word, index) => {
        expect(word.kannada, `Word at index ${index} has empty kannada field`).toBeTruthy()
        expect(typeof word.kannada, `Word at index ${index} kannada should be a string`).toBe('string')
        expect(word.kannada.trim().length, `Word at index ${index} kannada should not be empty`).toBeGreaterThan(0)
      })
    })

    it('each word should have non-empty transliteration field', () => {
      vocabulary.forEach((word, index) => {
        expect(word.transliteration, `Word at index ${index} has empty transliteration field`).toBeTruthy()
        expect(typeof word.transliteration, `Word at index ${index} transliteration should be a string`).toBe('string')
        expect(word.transliteration.trim().length, `Word at index ${index} transliteration should not be empty`).toBeGreaterThan(0)
      })
    })

    it('each word should have non-empty english field', () => {
      vocabulary.forEach((word, index) => {
        expect(word.english, `Word at index ${index} has empty english field`).toBeTruthy()
        expect(typeof word.english, `Word at index ${index} english should be a string`).toBe('string')
        expect(word.english.trim().length, `Word at index ${index} english should not be empty`).toBeGreaterThan(0)
      })
    })

    it('each word should have a valid category', () => {
      vocabulary.forEach((word, index) => {
        expect(word.category, `Word at index ${index} has empty category field`).toBeTruthy()
        expect(typeof word.category, `Word at index ${index} category should be a string`).toBe('string')
        expect(categories.includes(word.category) || word.category === 'all', 
          `Word at index ${index} has invalid category: ${word.category}`).toBe(true)
      })
    })
  })

  describe('Uniqueness', () => {
    it('should not have duplicate kannada words', () => {
      const kannadaWords = vocabulary.map(word => word.kannada)
      const uniqueKannadaWords = new Set(kannadaWords)
      expect(uniqueKannadaWords.size).toBe(vocabulary.length)
    })

    it('should not have duplicate english translations for the same kannada word', () => {
      const wordMap = new Map()
      vocabulary.forEach((word, index) => {
        if (wordMap.has(word.kannada)) {
          const existing = wordMap.get(word.kannada)
          expect(existing.english, 
            `Duplicate kannada word "${word.kannada}" at index ${index} with different english translation`).toBe(word.english)
        } else {
          wordMap.set(word.kannada, word)
        }
      })
    })
  })

  describe('Categories', () => {
    it('categories should be an array', () => {
      expect(Array.isArray(categories)).toBe(true)
    })

    it('categories should include "all"', () => {
      expect(categories.includes('all')).toBe(true)
    })

    it('all words should belong to valid categories', () => {
      const validCategories = categories.filter(cat => cat !== 'all')
      vocabulary.forEach((word, index) => {
        expect(validCategories.includes(word.category), 
          `Word at index ${index} has invalid category: ${word.category}`).toBe(true)
      })
    })

    it('should have words in each category (except introductions which is only in phrases)', () => {
      const validCategories = categories.filter(cat => cat !== 'all' && cat !== 'introductions')
      validCategories.forEach(category => {
        const wordsInCategory = vocabulary.filter(word => word.category === category)
        expect(wordsInCategory.length, `Category "${category}" should have at least one word`).toBeGreaterThan(0)
      })
    })
  })

  describe('Phrases', () => {
    it('phrases should be an array', () => {
      expect(Array.isArray(phrases)).toBe(true)
    })

    it('each phrase should have required fields', () => {
      phrases.forEach((phrase, index) => {
        expect(phrase, `Phrase at index ${index} is missing required fields`).toHaveProperty('kannada')
        expect(phrase, `Phrase at index ${index} is missing required fields`).toHaveProperty('transliteration')
        expect(phrase, `Phrase at index ${index} is missing required fields`).toHaveProperty('english')
        expect(phrase, `Phrase at index ${index} is missing required fields`).toHaveProperty('category')
      })
    })

    it('each phrase should have non-empty fields', () => {
      phrases.forEach((phrase, index) => {
        expect(phrase.kannada.trim().length, `Phrase at index ${index} kannada should not be empty`).toBeGreaterThan(0)
        expect(phrase.transliteration.trim().length, `Phrase at index ${index} transliteration should not be empty`).toBeGreaterThan(0)
        expect(phrase.english.trim().length, `Phrase at index ${index} english should not be empty`).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Quality', () => {
    it('should have words from multiple categories', () => {
      const categoryCount = new Set(vocabulary.map(word => word.category)).size
      expect(categoryCount).toBeGreaterThan(5)
    })

    it('transliteration should be a valid string', () => {
      vocabulary.forEach((word, index) => {
        // Transliteration should be a non-empty string
        expect(typeof word.transliteration).toBe('string')
        expect(word.transliteration.trim().length).toBeGreaterThan(0)
        // Should not contain only whitespace
        expect(word.transliteration.trim(), 
          `Word at index ${index} transliteration should not be only whitespace`).toBeTruthy()
      })
    })

    it('pronunciation should be a valid string if present', () => {
      vocabulary.forEach((word, index) => {
        if (word.pronunciation) {
          // Pronunciation should be a non-empty string
          expect(typeof word.pronunciation).toBe('string')
          expect(word.pronunciation.trim().length, 
            `Word at index ${index} pronunciation should not be empty`).toBeGreaterThan(0)
          // Should contain hyphens for syllable separation
          expect(word.pronunciation, 
            `Word at index ${index} pronunciation should contain syllable separators`).toMatch(/[a-zA-Z-]+/)
        }
      })
    })

    it('english translations should be reasonable length', () => {
      vocabulary.forEach((word, index) => {
        expect(word.english.length, 
          `Word at index ${index} english translation is too long: ${word.english}`).toBeLessThan(100)
        expect(word.english.length, 
          `Word at index ${index} english translation is too short`).toBeGreaterThan(0)
      })
    })
  })

  describe('Specific Word Checks', () => {
    it('should include common greeting words', () => {
      const greetingWords = vocabulary.filter(word => word.category === 'greetings')
      expect(greetingWords.length).toBeGreaterThan(0)
      
      const hasHello = vocabulary.some(word => 
        word.english.toLowerCase().includes('hello') || word.kannada === 'ನಮಸ್ಕಾರ'
      )
      expect(hasHello).toBe(true)
    })

    it('should include numbers 1-10', () => {
      const numberWords = vocabulary.filter(word => word.category === 'numbers')
      expect(numberWords.length).toBeGreaterThanOrEqual(10)
    })

    it('should include common pronouns', () => {
      const pronounWords = vocabulary.filter(word => word.category === 'pronouns')
      expect(pronounWords.length).toBeGreaterThan(0)
    })
  })
})

