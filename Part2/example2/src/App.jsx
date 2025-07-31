import { useState } from "react"

import Note from "./components/Note/Note"

function App(props) {

  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map(n => <Note key={n.id} note={n} />)}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
