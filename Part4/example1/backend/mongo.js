const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Aperta:${password}@cluster0.aq25o0n.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

if (true) {
    const note = new Note({
        content: 'This is a test note',
        important: true
    })

    note.save().then(result => {
        console.log('note saved!');
        mongoose.connection.close()
    })
}

if (false) {
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}