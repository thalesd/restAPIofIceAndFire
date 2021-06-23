const express = require('express');

const casaRoutes = require('./routes/casa');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));


const useCors = require('./middlewares/useCors');
app.use(useCors);

app.use(casaRoutes);

app.listen(8080);