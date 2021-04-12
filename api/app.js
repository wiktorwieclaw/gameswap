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
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('index'));

app.use('/games', require('./routes/game.route.js'));

app.post('/login', (req, res) => {
  console.log('login req: ' + req.body);
  res.json({test: "test"});
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
