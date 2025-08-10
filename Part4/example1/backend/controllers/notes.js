const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.post('/', async (req, res, next) => {

    const body = req.body

    const note = new Note({
        "content": body.content,
        "important": Boolean(body.important) || false
    })

    const savedNote = await note.save()
    res.status(201).json(savedNote)
})

notesRouter.get('/:id', (req, res, next) => {

    const id = req.params.id

    Note.findById(id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
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