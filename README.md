# Movie Search App (Node.js + Front-End)

A simple movie search application that fetches data from the OMDB API through a The API key is hidden using a `.env` file and never exposed to the browser.

## Features
- Search movies by keyword
- Random movie suggestion
- Secure backend API proxy
- Clean front-end UI
- Fully commented code for learning

## Tech Stack Include
- HTML, CSS, JavaScript, Git, GitHub
- Node.js + Express
- OMDB API
- dotenv for environment variables
## How it Works
The front-end calls:
/movies?s=searchTerm
The backend received the request, fetches data from OMDB using a hidden API key

## Run Locally
npm install
node server.js
open: http://localhost:3000

## Security
- `.env` is ignored using `.gitignore`
- API Key is never exposed to the front-end

  
