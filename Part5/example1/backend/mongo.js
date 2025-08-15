const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.TEST_MONGODB_URI)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

if (false) {
    const note = new Note({
        content: 'This is a new note',
        important: true
    })

    note.save().then(result => {
        console.log('note saved!');
        mongoose.connection.close()
    })
}

if (true) {
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}