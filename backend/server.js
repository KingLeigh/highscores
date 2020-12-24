const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production"){
  app.use(express.static("build"));
}

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const scoresRouter = require('./routes/scores');

app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/scores', scoresRouter);

if (process.env.NODE_ENV === "production"){
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "../build", "index.html"));
  });  
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});