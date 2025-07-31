
function App({ notes }) {

  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map(n => <li>{n.content}</li>)}
      </ul>
    </>
  )
}

export default App
