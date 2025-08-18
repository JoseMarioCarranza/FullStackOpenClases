import { useState, useEffect, useRef } from "react"

import Note from "./components/Note/Note"
import Notification from "./components/Notification/Notification"
import Footer from "./components/Footer/Footer"
import LoginForm from "./components/LoginForm/LoginForm"
import Togglable from "./components/Togglable/Togglable"

import noteService from "./services/notes"
import loginService from "./services/login"
import NoteForm from "./components/NoteForm/NoteForm"

function App() {

  const noteFormRef = useRef()

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll ? notes : notes.filter(n => n.important === true)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

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

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Togglable>
  )

  const showUser = () => (
    <div>
      <p>{user.name} logged-in</p>
    </div>
  )

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
      })
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : showUser()}

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
