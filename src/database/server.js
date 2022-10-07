const mongoose = require("mongoose");
function mongooseConnection(){
  mongoose.connect('mongodb+srv://mohitchopra5743:Mchopra123@cluster0.2wyzgln.mongodb.net/test', {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
}).then(()=>{
      console.log("connection established");
}).catch(err=>console.log(err.message));
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose connection is disconnected due to app termination...'
    );
    process.exit(0);
  });
});
}

module.exports = mongooseConnection;







