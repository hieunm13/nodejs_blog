const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override')
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const sortMiddleware = require('./app/middlewares/sortMiddleware');
//tự nạp file index.js
const route = require('./routes');

const db = require('./config/db');

//Connect DB
db.connect();


app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
      extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

app.use(sortMiddleware);

app.use(morgan('combined'));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helper/handlebars')
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
