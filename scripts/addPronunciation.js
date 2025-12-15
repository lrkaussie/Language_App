// Script to automatically add pronunciation hints to Kannada vocabulary
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the kannadaData.js file
const dataPath = path.join(__dirname, '../src/data/kannadaData.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

// Function to generate pronunciation from transliteration
function generatePronunciation(transliteration) {
  if (!transliteration || transliteration.trim() === '') {
    return '';
  }

  // Clean and prepare the transliteration
  let cleaned = transliteration.trim();
  
  // Split into syllables using common patterns
  // This is a simplified approach based on Kannada phonetics
  let syllables = [];
  
  // Handle multi-word phrases
  if (cleaned.includes(' ')) {
    const words = cleaned.split(' ');
    return words.map(word => generatePronunciation(word)).join('-');
  }
  
  // Common vowel patterns
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  
  let currentSyllable = '';
  let chars = cleaned.split('');
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];
    
    currentSyllable += char;
    
    // Check if we should break the syllable
    const shouldBreak = 
      // Vowel followed by consonant
      (vowels.some(v => char.toLowerCase() === v) && nextChar && !vowels.some(v => nextChar.toLowerCase() === v)) ||
      // Double consonants
      (char === nextChar) ||
      // End of string
      (i === chars.length - 1);
    
    if (shouldBreak && currentSyllable.length > 0) {
      syllables.push(currentSyllable);
      currentSyllable = '';
    }
  }
  
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  // If no syllables were generated, treat the whole word as one syllable
  if (syllables.length === 0) {
    syllables = [cleaned];
  }
  
  // Convert syllables to pronunciation format
  const pronunciationSyllables = syllables.map((syl, index) => {
    let pronSyl = syl;
    
    // Common transliteration to pronunciation mappings
    pronSyl = pronSyl.replace(/aa/gi, 'ah');
    pronSyl = pronSyl.replace(/ee/gi, 'ee');
    pronSyl = pronSyl.replace(/oo/gi, 'oo');
    pronSyl = pronSyl.replace(/ai/gi, 'ay');
    pronSyl = pronSyl.replace(/au/gi, 'ow');
    pronSyl = pronSyl.replace(/kh/gi, 'kh');
    pronSyl = pronSyl.replace(/ch/gi, 'ch');
    pronSyl = pronSyl.replace(/sh/gi, 'sh');
    pronSyl = pronSyl.replace(/th/gi, 'th');
    pronSyl = pronSyl.replace(/dh/gi, 'dh');
    pronSyl = pronSyl.replace(/ph/gi, 'ph');
    pronSyl = pronSyl.replace(/bh/gi, 'bh');
    pronSyl = pronSyl.replace(/gh/gi, 'gh');
    
    // Capitalize first syllable (stress marker)
    if (index === 0 || (syllables.length > 2 && index === 1)) {
      pronSyl = pronSyl.toUpperCase();
    } else {
      pronSyl = pronSyl.toLowerCase();
    }
    
    return pronSyl;
  });
  
  return pronunciationSyllables.join('-');
}

// Regular expression to match vocabulary entries without pronunciation
const vocabEntryRegex = /\{ kannada: "([^"]+)", transliteration: "([^"]+)", english: "([^"]+)", category: "([^"]+)" \}/g;

let matchCount = 0;
let updatedContent = fileContent.replace(vocabEntryRegex, (match, kannada, transliteration, english, category) => {
  // Generate pronunciation
  const pronunciation = generatePronunciation(transliteration);
  matchCount++;
  
  // Return updated entry with pronunciation
  return `{ kannada: "${kannada}", transliteration: "${transliteration}", pronunciation: "${pronunciation}", english: "${english}", category: "${category}" }`;
});

// Write the updated content back to the file
fs.writeFileSync(dataPath, updatedContent, 'utf8');

console.log('✓ Pronunciation hints added successfully!');
console.log(`✓ Updated ${matchCount} vocabulary entries`);
console.log('✓ Please review the generated pronunciations and adjust as needed');
console.log('\nNext steps:');
console.log('1. Review the pronunciations in kannadaData.js');
console.log('2. Run: npm test');
console.log('3. Manually adjust any pronunciations that seem incorrect');

