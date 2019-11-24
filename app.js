//Importing all our dependencies
// import express from 'express';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./src/route/userRoute');

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT,10) || 7048;

// Log request to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1',  userRouter);

//Setup a default catch-all route that sends back a welcome message in JSON format
app.get('/', (req, res) => res.status(200).send({
    message: "Welcome to my application"
}));

// // account middleware
// app.use('/auth', acctRoutes);

//Start the express server
app.listen(port, () => console.log(`server running on port ${port}`));