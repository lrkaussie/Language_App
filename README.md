# TalkTurtle - Kannada Language Learning

A simple proof of concept for learning Kannada language with flashcards, phrases, and quizzes.

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **LocalStorage** - Client-side data persistence

## Features

1. **Flashcards** - Learn vocabulary with flip cards showing Kannada script, transliteration, and English
2. **Phrases** - Common Kannada phrases with translations
3. **Quiz** - Interactive multiple-choice quiz to test your knowledge
4. **Progress Tracking** - Mark words as learned (saved in browser)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Flashcards.jsx    # Flashcard learning component
│   │   ├── Phrases.jsx       # Phrases learning component
│   │   └── Quiz.jsx          # Quiz component
│   ├── data/
│   │   └── kannadaData.js    # Vocabulary and phrases data
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Next Steps for Full Implementation

- Add more vocabulary and phrases
- Implement spaced repetition algorithm
- Add audio pronunciation
- User accounts and cloud sync
- Progress analytics
- Grammar lessons
- Writing practice

