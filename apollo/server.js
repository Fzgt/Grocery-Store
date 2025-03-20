const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const express = require('express');
require('dotenv').config(); 




const corsOptions = {
  origin: "http://localhost:8080"
};

const app = express();

app.use(cors(corsOptions));

// Config setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const loginRouter = require('./routes/login');
app.use(loginRouter);

// ROUTES HANDLER
const router = require("./routes/index.js");
// const verifyToken = require("./middleware.js");
// app.use(verifyToken);
app.use(router);



app.get("/", (req, res) => {
  res.json({ message: "Welcome to group3 backend." });
});




// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
