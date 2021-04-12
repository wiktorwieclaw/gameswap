const express = require('express');
const bodyParser = require('body-parser/');
const Sequelize = require('sequelize');
const db = require('./db.js');

db.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log('error: ' + err))

db.sync({ force: true }).then(() => {
  console.log("[server]Drop and re-sync database.");
});

const app = express();
app.get('/', (req, res) => res.send('index'));
app.use('/games', require('./routes/games.js'));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
