const express = require('express');

const casaRoutes = require('./routes/casa');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));


const setHeaders = require('./middlewares/setHeaders');
app.use(setHeaders);

app.use(casaRoutes);

app.listen(8080);