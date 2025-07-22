const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app')

const DB  = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((con) => {
  console.log('Database connected');
});

//console.log(process.env);
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});