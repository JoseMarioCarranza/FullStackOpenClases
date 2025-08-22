import { useState } from 'react'

const NoteForm = ({ createNote }) => {

    const [newNote, setNewNote] = useState('')

    const addNote = event => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: true
        })

        setNewNote('')
    }

    return (
        <form className='formDiv' onSubmit={addNote}>
            <input
                value={newNote}
                onChange={event => setNewNote(event.target.value)}
            />
            <button type="submit">save</button>
        </form>
    )
}

export default NoteForm