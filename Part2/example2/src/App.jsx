import { useState } from "react"

import Note from "./components/Note/Note"

function App(props) {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map(n => <Note key={n.id} note={n} />)}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
