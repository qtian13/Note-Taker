// const express = require('express');
// const path = require('path');
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

const PORT = process.env.PORT || 3001;



const app = express();

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });