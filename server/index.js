/*
    This is just a small sample to get you started. 
    Note that the docker setup will be looking for `index.js`,
    so it's best to use this file or the same file name.
 */
var peopleRouter = require("./routes/people");
var planetsRouter = require("./routes/planets");

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", peopleRouter);
app.use("/", planetsRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
