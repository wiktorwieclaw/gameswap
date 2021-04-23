const express = require('express');
const bodyParser = require('body-parser/');
const Sequelize = require('sequelize');
const db = require('./db.js');
const app = express();
const port = 3001;
const userController = require('./controllers/user.controller.js'); //todo

db.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log('error: ' + err))

db.sync({ force: false }).then(() => {
  console.log("[server]Drop and re-sync database.");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/user', require('./routes/user.route.js'));

app.post('/login', (req, res) => {
  console.log(`login req: mail: ${req.body.mail}, password: ${req.body.password}`);
  res.json({test: "mail and password received"});
});

app.post('/signup', userController.create); // todo

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
