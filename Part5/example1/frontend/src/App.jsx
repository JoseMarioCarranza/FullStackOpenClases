import { useState, useEffect } from "react"

import Note from "./components/Note/Note"
import Notification from "./components/Notification/Notification"
import Footer from "./components/Footer/Footer"

import noteService from "./services/notes"
import loginService from "./services/login"



function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }

  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      id: String(notes.length + 1),
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const toggleImportantOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note: '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

  }

  const handleNoteChange = (event) => { setNewNote(event.target.value) }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important === true)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )


  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null
          ? loginForm()
          : <div>
            <p>{user.name} logged-in</p>
          </div>
      }

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(n => <Note key={n.id} note={n} toggleImportance={() => toggleImportantOf(n.id)} />)}
      </ul>

      {user !== null && noteForm()}

      <Footer />
    </>
  )
}

export default App
