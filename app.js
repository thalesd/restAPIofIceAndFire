const express = require('express');
const mongoose = require('mongoose');

const casaRoutes = require('./routes/casa');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const setHeaders = require('./middlewares/setHeaders');
app.use(setHeaders);

app.use(casaRoutes);

//cpIregnjgscEQtkx
mongoose.connect('mongodb+srv://thales:cpIregnjgscEQtkx@cluster0.45pc1.mongodb.net/restApiOfIceAndFire?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
