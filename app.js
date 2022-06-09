const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log(err));

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/gigs', require('./routes/gigs'));
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
