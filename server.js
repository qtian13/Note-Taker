const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const { readFromFile, writeToFile, appendToFile } = require('./helpers/fileUtil');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for notes api
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

// POST Route for notes api
app.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    // Obtain existing notes
    appendToFile('./db/db.json', newNote);
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});

// DELETE Route for notes api
app.delete('/api/notes/:id', (req, res) => {
    readFromFile('./db/db.json')
      .then(data => {
        let notes = JSON.parse(data);
        const notesAfterDelete = notes.filter(note => note.id !== req.params.id);

        if (notesAfterDelete.length === notes.length) {
          return res.status(404).send('The note with the given ID was not found');
        }

        writeToFile('./db/db.json', notesAfterDelete);

        res.json('Successfully delete the note');
      })
});

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));