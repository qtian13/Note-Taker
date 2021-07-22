const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

var gettimes = 0;
app.get('/api/notes', (req, res) => {
  gettimes += 1;
  notesData = require('./db/db.json');

  res.json(JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')));
});

app.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title.trim() && text.trim()) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
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


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));