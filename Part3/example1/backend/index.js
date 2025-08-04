const express = require('express')
const cors = require('cors')

const app = express()

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: true
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {

    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    const note = {
        "id": maxId + 1,
        "content": body.content,
        "important": Boolean(body.important) || false
    }

    notes = notes.concat(note)

    res.json(note)
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(n => n.id === Number(id))
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(n => n.id !== Number(id))

    res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    const note = notes.find(n => n.id === id)

    const updatedNote = { ...note, important: !note.important }

    notes = notes.map(n => n.id !== id ? n : updatedNote)

    res.json(updatedNote)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
