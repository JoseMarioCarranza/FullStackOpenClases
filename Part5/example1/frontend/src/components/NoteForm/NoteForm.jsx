import React from 'react'

const NoteForm = ({ onSubmit, handleNoteChange, value }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                value={value}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
    )
}

export default NoteForm