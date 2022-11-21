/*
    This is just a small sample to get you started. 
    Note that the docker setup will be looking for `index.js`,
    so it's best to use this file or the same file name.
 */
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
