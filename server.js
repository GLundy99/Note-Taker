const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add note`);

    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            id: uuid(),
            title,
            text,
        };
    
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote
    };

    console.log(response);
    res.status(201).json(response);
    } else {
        res.status(500).json('Error');
    }
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/note.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/index.html'))
});


app.listen(PORT, () =>
console.info(`Example app listening at http://localhost:${PORT}`)
)

