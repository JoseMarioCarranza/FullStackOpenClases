const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.post('/', async (req, res) => {

    const { content, important } = req.body

    if (!content) {
        const err = new Error('Content is required')
        err.status = 400
        throw err
    }

    const note = new Note({
        "content": content,
        "important": Boolean(important) || false
    })

    const savedNote = await note.save()
    res.status(201).json(savedNote)

})

notesRouter.get('/:id', async (req, res) => {

    const note = await Note.findById(req.params.id)

    if (!note) {
        const err = new Error('id not found')
        err.status = 404
        throw err
    }

    res.json(note)

})

notesRouter.delete('/:id', async (req, res) => {

    const deleted = await Note.findByIdAndDelete(req.params.id)

    if (!deleted) {
        const err = new Error('Note not found')
        err.status = 404
        throw err
    }

    res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
    const { content, important } = req.body

    Note.findByIdAndUpdate(
        req.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => res.json(updatedNote))
        .catch(error => next(error))
})

module.exports = notesRouter