
require('dotenv').config();
require('./config/mongoose');
const express = require('express');

const {PORT} = process.env;

const auth = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');

app.use('/auth',auth);

app.get('/', (req,res) => {
    res.status(200).render('home');
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));