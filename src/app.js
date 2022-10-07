const express = require('express');
const createError = require('http-errors');
const mongooseConnection = require("../src/database/server");
const bookRouter = require("../src/routes/booksRoutes")
const app= express();
app.use(express.json());
app.use(bookRouter);
app.use('/Book', bookRouter);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

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
const port =process.env.port || 5600;
app.listen(port,()=>{
    console.log(`connection is live at port no:${port}`);
})