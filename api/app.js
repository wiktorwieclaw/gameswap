const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const cors = require('cors');
const app = express();
const port = 3001;

db.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log('error: ' + err))

db.sync({ force: false }).then(() => {
  console.log("Drop and re-sync database.");
});

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/user', require('./routes/user.routes.js'));
app.use('/game', require('./routes/game.routes.js'));
app.use('/auth', require('./routes/auth.routes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
