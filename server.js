const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// GET Route for homepage


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (error, data) => {
    error ? console.error(error) : res.json(JSON.parse(data));
  });
});

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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});

app.delete('/api/notes/:id', (req, res) => {
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const noteId = req.params.id;
        const parsedNotes = JSON.parse(data);

        // remove target note
        notesAfterDelete = parsedNotes.filter(note => note.id != noteId);

        // Write updated notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(notesAfterDelete, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
    };

    res.json(response);
});

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));