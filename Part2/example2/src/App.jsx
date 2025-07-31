import Note from "./components/Note/Note"

function App({ notes }) {

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map(n => <Note key={n.id} note={n} />)}
      </ul>
    </>
  )
}

export default App
