const express = require('express');
const bodyParser = require('body-parser');
const auth= require("../src/routes/auth")
const mongooseConnection = require("../src/database/server");
const bookRouter = require("../src/routes/booksRoutes");
const errorController= require("../src/controller/err")
const app= express();
app.use(express.json());
app.use(bookRouter);
app.use('/Book', bookRouter);
app.use('/auth',auth)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//404 handler and pass to error handler
app.use(errorController.get404)

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
mongooseConnection()
const port =process.env.port || 5000;
app.listen(port,()=>{
    console.log(`connection is live at port no:${port}`);
})