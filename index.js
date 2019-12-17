//initializing variables
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/genres', genres);

//listen to localhost
app.listen(3000, ()=> console.log('Listening on port 3000'))