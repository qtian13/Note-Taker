// // const api = require('./routes/note.js')

// const PORT = process.env.port || 3001;
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// // app.use('api', api);
// app.use(express.static('public'));

// app.get('/', (req, res) => 
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;



const app = express();

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notesData));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));