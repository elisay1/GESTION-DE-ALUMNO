var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var qs = require('querystring');
require('./config/setupModel');

const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes'); 

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parse', str => {
    return qs.parse(str);
});

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use('/api/students', studentRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando!');
});


module.exports = app;