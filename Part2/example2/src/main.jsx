import { createRoot } from 'react-dom/client'
import axios from 'axios'

import App from './App.jsx'

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    createRoot(document.getElementById('root')).render(<App notes={notes} />)
  })